/*
  Warnings:

  - You are about to drop the `corridas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "corridas" DROP CONSTRAINT "corridas_motoristaId_fkey";

-- DropForeignKey
ALTER TABLE "corridas" DROP CONSTRAINT "corridas_passageiroId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_indicanteId_fkey";

-- DropTable
DROP TABLE "corridas";

-- DropTable
DROP TABLE "usuarios";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "codigoIndicacao" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motorista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "veiculo" TEXT NOT NULL,

    CONSTRAINT "Motorista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corrida" (
    "id" SERIAL NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" TIMESTAMP(3),
    "passageiroId" INTEGER NOT NULL,
    "motoristaId" INTEGER,

    CONSTRAINT "Corrida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" SERIAL NOT NULL,
    "corridaId" INTEGER NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Motorista_email_key" ON "Motorista"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Avaliacao_corridaId_key" ON "Avaliacao"("corridaId");

-- AddForeignKey
ALTER TABLE "Corrida" ADD CONSTRAINT "Corrida_passageiroId_fkey" FOREIGN KEY ("passageiroId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Corrida" ADD CONSTRAINT "Corrida_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_corridaId_fkey" FOREIGN KEY ("corridaId") REFERENCES "Corrida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
