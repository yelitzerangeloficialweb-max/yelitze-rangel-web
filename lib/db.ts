import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const logPath = path.join(process.cwd(), 'db_init_log.txt');
fs.appendFileSync(logPath, `[${new Date().toISOString()}] Initializing DB. CWD: ${process.cwd()}, DB_URL: ${process.env.DATABASE_URL}\n`);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query', 'error', 'warn'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
