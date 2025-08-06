/*
  Warnings:

  - Added the required column `tags` to the `UniversityProject` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UniversityProject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "tags" TEXT NOT NULL
);
INSERT INTO "new_UniversityProject" ("description", "id", "name", "summary", "topic") SELECT "description", "id", "name", "summary", "topic" FROM "UniversityProject";
DROP TABLE "UniversityProject";
ALTER TABLE "new_UniversityProject" RENAME TO "UniversityProject";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
