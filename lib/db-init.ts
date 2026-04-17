import { db } from "./db";

export async function ensureAvailabilityTables() {
    try {
        // Check if table exists (SQLite specific)
        const tableCheck = await db.$queryRaw`
            SELECT name FROM sqlite_master WHERE type='table' AND name='Availability';
        ` as any[];

        if (!tableCheck || tableCheck.length === 0) {
            console.log("Database tables missing. Running programmatic initialization...");
            
            // 1. Create Availability
            await db.$executeRawUnsafe(`
                CREATE TABLE IF NOT EXISTS "Availability" (
                    "id" TEXT NOT NULL PRIMARY KEY,
                    "date" DATETIME NOT NULL,
                    "morningEnabled" BOOLEAN NOT NULL DEFAULT false,
                    "afternoonEnabled" BOOLEAN NOT NULL DEFAULT false,
                    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "updatedAt" DATETIME NOT NULL
                );
            `);

            // 2. Index for Availability
            await db.$executeRawUnsafe(`
                CREATE UNIQUE INDEX IF NOT EXISTS "Availability_date_key" ON "Availability"("date");
            `);

            // 3. Create Appointment
            await db.$executeRawUnsafe(`
                CREATE TABLE IF NOT EXISTS "Appointment" (
                    "id" TEXT NOT NULL PRIMARY KEY,
                    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "updatedAt" DATETIME NOT NULL,
                    "date" DATETIME NOT NULL,
                    "slot" TEXT NOT NULL,
                    "customerName" TEXT NOT NULL,
                    "customerEmail" TEXT NOT NULL,
                    "customerPhone" TEXT NOT NULL,
                    "meetingType" TEXT NOT NULL DEFAULT 'online',
                    "paymentMethod" TEXT NOT NULL,
                    "status" TEXT NOT NULL DEFAULT 'pending',
                    "notes" TEXT
                );
            `);

            console.log("Database tables successfully initialized via raw SQL.");
        }

        // --- MIGRATION: Add meetingType to Appointment if it doesn't exist ---
        try {
            await db.$executeRawUnsafe(`
                ALTER TABLE "Appointment" ADD COLUMN "meetingType" TEXT NOT NULL DEFAULT 'online';
            `);
            console.log("Database migration: Added meetingType column to Appointment table.");
        } catch (e) {
            // Probably column already exists, which is fine
        }
    } catch (error) {
        console.error("Critical: Error initializing database tables:", error);
        // We don't throw here to avoid crashing the whole request if it's just a permission issue
        // But the error will be visible in server logs
    }
}
