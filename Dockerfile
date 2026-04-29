
# Base image
FROM node:20-alpine AS base
RUN apk add --no-cache openssl libc6-compat

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install Prisma CLI for db push
RUN npm install -g prisma@5.10.2

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential files for standalone mode
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy the Prisma engine binaries needed for db push at runtime
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma

# Ensure the nextjs user has permissions on the prisma directory for SQLite
RUN chown -R nextjs:nodejs ./prisma

# Create startup script that handles db sync gracefully
RUN printf '#!/bin/sh\necho "Syncing database schema..."\ncd /app && npx prisma db push --skip-generate --accept-data-loss 2>&1 || echo "Warning: db push had issues, continuing anyway..."\necho "Starting server..."\nexec node server.js\n' > /app/start.sh && chmod +x /app/start.sh
RUN chown nextjs:nodejs /app/start.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Ensure Prisma uses the correct database path
ENV DATABASE_URL="file:/app/prisma/dev.db"

# Use startup script that syncs DB then starts server
CMD ["/app/start.sh"]
