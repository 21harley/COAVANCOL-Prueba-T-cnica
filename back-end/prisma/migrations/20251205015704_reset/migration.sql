/*
  Warnings:

  - The primary key for the `Asociado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Asociado` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asociado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "estado_pipeline" TEXT NOT NULL,
    "ultima_actualizacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Asociado" ("codigo", "createdAt", "estado_pipeline", "id", "identificacion", "nombre", "ultima_actualizacion", "updatedAt") SELECT "codigo", "createdAt", "estado_pipeline", "id", "identificacion", "nombre", "ultima_actualizacion", "updatedAt" FROM "Asociado";
DROP TABLE "Asociado";
ALTER TABLE "new_Asociado" RENAME TO "Asociado";
CREATE UNIQUE INDEX "Asociado_codigo_key" ON "Asociado"("codigo");
CREATE UNIQUE INDEX "Asociado_identificacion_key" ON "Asociado"("identificacion");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
