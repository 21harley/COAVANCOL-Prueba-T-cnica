-- CreateTable
CREATE TABLE "Asociado" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "estado_pipeline" TEXT NOT NULL,
    "ultima_actualizacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Asociado_codigo_key" ON "Asociado"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Asociado_identificacion_key" ON "Asociado"("identificacion");
