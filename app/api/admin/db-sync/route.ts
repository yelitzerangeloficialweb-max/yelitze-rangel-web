import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const results: string[] = [];

    try {
        // 1. Sync 'instagram' column
        try {
            await db.$executeRawUnsafe(`ALTER TABLE "VenezuelaEnElCuerpoRegistration" ADD COLUMN "instagram" TEXT`);
            results.push("Added column 'instagram'");
        } catch (e: any) {
            if (e.message.includes("duplicate column name") || e.message.includes("already exists")) {
                results.push("Column 'instagram' already exists");
            } else {
                throw e;
            }
        }

        // 2. Sync 'scanned' column
        try {
            await db.$executeRawUnsafe(`ALTER TABLE "VenezuelaEnElCuerpoRegistration" ADD COLUMN "scanned" BOOLEAN DEFAULT 0`);
            results.push("Added column 'scanned'");
        } catch (e: any) {
            if (e.message.includes("duplicate column name") || e.message.includes("already exists")) {
                results.push("Column 'scanned' already exists");
            } else {
                throw e;
            }
        }

        // 3. Sync 'scannedAt' column
        try {
            await db.$executeRawUnsafe(`ALTER TABLE "VenezuelaEnElCuerpoRegistration" ADD COLUMN "scannedAt" DATETIME`);
            results.push("Added column 'scannedAt'");
        } catch (e: any) {
            if (e.message.includes("duplicate column name") || e.message.includes("already exists")) {
                results.push("Column 'scannedAt' already exists");
            } else {
                throw e;
            }
        }

        return NextResponse.json({
            success: true,
            message: "Database synchronization completed",
            steps: results
        });

    } catch (error: any) {
        console.error('Migration error:', error);
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
