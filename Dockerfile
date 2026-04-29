
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

# CRITICAL: Save a fresh copy of schema.prisma OUTSIDE the volume mount point
# The volume at /app/prisma will overlay the build files with old volume data,
# so we keep a pristine copy at /app/prisma-fresh/ to restore on startup.
COPY --from=builder /app/prisma/schema.prisma /app/prisma-fresh/schema.prisma

# Copy the Prisma engine binaries needed for db push at runtime
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma

# Ensure the nextjs user has permissions
RUN chown -R nextjs:nodejs ./prisma
RUN chown -R nextjs:nodejs ./prisma-fresh
RUN chown -R nextjs:nodejs ./node_modules/.prisma
RUN chown -R nextjs:nodejs ./node_modules/@prisma

# Create startup script:
# 1. Copy the FRESH schema.prisma into the volume (overwriting the old one)
# 2. Run db push to sync the database with the new schema
# 3. Start the server
RUN printf '#!/bin/sh\necho "=== Updating schema in volume ==="\ncp /app/prisma-fresh/schema.prisma /app/prisma/schema.prisma\necho "=== Syncing database schema ==="\ncd /app && npx prisma db push --skip-generate --accept-data-loss 2>&1 || echo "Warning: db push had issues, continuing..."\necho "=== Starting server ==="\nexec node server.js\n' > /app/start.sh && chmod +x /app/start.sh
RUN chown nextjs:nodejs /app/start.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Ensure Prisma uses the correct database path (inside the volume)
ENV DATABASE_URL="file:/app/prisma/dev.db"

# Use startup script
CMD ["/app/start.sh"]
