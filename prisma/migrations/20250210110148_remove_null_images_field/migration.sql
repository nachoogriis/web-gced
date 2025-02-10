/*
  Warnings:

  - Made the column `images` on table `UniversityProject` required. This step will fail if there are existing NULL values in that column.

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
    "tags" TEXT NOT NULL,
    "images" TEXT NOT NULL
);
INSERT INTO "new_UniversityProject" ("description", "id", "images", "name", "summary", "tags", "topic") SELECT "description", "id", "images", "name", "summary", "tags", "topic" FROM "UniversityProject";
DROP TABLE "UniversityProject";
ALTER TABLE "new_UniversityProject" RENAME TO "UniversityProject";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
