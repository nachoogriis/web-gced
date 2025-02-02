-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alumni" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "linkedInURL" TEXT,
    "generation" INTEGER NOT NULL,
    "review" TEXT,
    "tfgTitle" TEXT NOT NULL,
    "tfgDescription" TEXT NOT NULL,
    "tfgUniversity" TEXT NOT NULL DEFAULT 'Universitat Politècnica de Catalunya',
    "currentJob" TEXT
);
INSERT INTO "new_Alumni" ("currentJob", "firstName", "generation", "id", "lastName", "linkedInURL", "review", "tfgDescription", "tfgTitle") SELECT "currentJob", "firstName", "generation", "id", "lastName", "linkedInURL", "review", "tfgDescription", "tfgTitle" FROM "Alumni";
DROP TABLE "Alumni";
ALTER TABLE "new_Alumni" RENAME TO "Alumni";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
