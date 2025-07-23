/*
  Warnings:

  - You are about to drop the `Carteiras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Corridas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recompensas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Carteiras" DROP CONSTRAINT "Carteiras_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Corridas" DROP CONSTRAINT "Corridas_motoristaId_fkey";

-- DropForeignKey
ALTER TABLE "Corridas" DROP CONSTRAINT "Corridas_passageiroId_fkey";

-- DropForeignKey
ALTER TABLE "Recompensas" DROP CONSTRAINT "Recompensas_corridaId_fkey";

-- DropForeignKey
ALTER TABLE "Recompensas" DROP CONSTRAINT "Recompensas_usuarioId_fkey";

-- DropTable
DROP TABLE "Carteiras";

-- DropTable
DROP TABLE "Corridas";

-- DropTable
DROP TABLE "Recompensas";

-- DropTable
DROP TABLE "Usuarios";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "codigoIndicacao" TEXT,
    "indicanteId" INTEGER,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corridas" (
    "id" TEXT NOT NULL,
    "passageiroId" INTEGER NOT NULL,
    "motoristaId" INTEGER,
    "status" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "distanciaKm" DOUBLE PRECISION,
    "valor" DOUBLE PRECISION,
    "agendada" BOOLEAN NOT NULL DEFAULT false,
    "dataHora" TIMESTAMP(3),
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "corridas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_codigoIndicacao_key" ON "usuarios"("codigoIndicacao");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_indicanteId_fkey" FOREIGN KEY ("indicanteId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corridas" ADD CONSTRAINT "corridas_passageiroId_fkey" FOREIGN KEY ("passageiroId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corridas" ADD CONSTRAINT "corridas_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
