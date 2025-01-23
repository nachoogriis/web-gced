/*
  Warnings:

  - You are about to drop the column `alumniId` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `alumniId` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `currentJob` to the `Alumni` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "InternshipAlumni" (
    "alumniId" INTEGER NOT NULL,
    "internshipId" INTEGER NOT NULL,

    PRIMARY KEY ("alumniId", "internshipId"),
    CONSTRAINT "InternshipAlumni_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InternshipAlumni_internshipId_fkey" FOREIGN KEY ("internshipId") REFERENCES "Internship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MasterOrganizations" (
    "masterId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,

    PRIMARY KEY ("masterId", "organizationId"),
    CONSTRAINT "MasterOrganizations_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MasterOrganizations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MasterAlumni" (
    "alumniId" INTEGER NOT NULL,
    "masterId" INTEGER NOT NULL,

    PRIMARY KEY ("alumniId", "masterId"),
    CONSTRAINT "MasterAlumni_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MasterAlumni_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectAlumni" (
    "alumniId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    PRIMARY KEY ("alumniId", "projectId"),
    CONSTRAINT "ProjectAlumni_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectAlumni_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UniversityProject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topic" TEXT NOT NULL
);

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
    "currentJob" TEXT NOT NULL
);
INSERT INTO "new_Alumni" ("firstName", "generation", "id", "lastName", "linkedInURL", "review", "tfgDescription", "tfgTitle") SELECT "firstName", "generation", "id", "lastName", "linkedInURL", "review", "tfgDescription", "tfgTitle" FROM "Alumni";
DROP TABLE "Alumni";
ALTER TABLE "new_Alumni" RENAME TO "Alumni";
CREATE TABLE "new_Internship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "organizationId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Internship_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Internship" ("description", "id", "organizationId", "position") SELECT "description", "id", "organizationId", "position" FROM "Internship";
DROP TABLE "Internship";
ALTER TABLE "new_Internship" RENAME TO "Internship";
CREATE TABLE "new_Master" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Master" ("description", "id", "name") SELECT "description", "id", "name" FROM "Master";
DROP TABLE "Master";
ALTER TABLE "new_Master" RENAME TO "Master";
CREATE TABLE "new_Organization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Spain',
    "city" TEXT NOT NULL DEFAULT 'Barcelona'
);
INSERT INTO "new_Organization" ("id", "name") SELECT "id", "name" FROM "Organization";
DROP TABLE "Organization";
ALTER TABLE "new_Organization" RENAME TO "Organization";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "alumniId" INTEGER NOT NULL
);
INSERT INTO "new_Project" ("alumniId", "description", "id", "name") SELECT "alumniId", "description", "id", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
