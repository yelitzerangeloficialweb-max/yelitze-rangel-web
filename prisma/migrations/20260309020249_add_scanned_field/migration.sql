-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VenezuelaEnElCuerpoRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "scanned" BOOLEAN NOT NULL DEFAULT false,
    "scannedAt" DATETIME
);
INSERT INTO "new_VenezuelaEnElCuerpoRegistration" ("city", "createdAt", "email", "id", "name", "whatsapp") SELECT "city", "createdAt", "email", "id", "name", "whatsapp" FROM "VenezuelaEnElCuerpoRegistration";
DROP TABLE "VenezuelaEnElCuerpoRegistration";
ALTER TABLE "new_VenezuelaEnElCuerpoRegistration" RENAME TO "VenezuelaEnElCuerpoRegistration";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
