-- CreateTable
CREATE TABLE "CorridaAgendada" (
    "id" SERIAL NOT NULL,
    "passageiroCpf" TEXT NOT NULL,
    "motoristaCpf" TEXT,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CorridaAgendada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localizacao" (
    "id" SERIAL NOT NULL,
    "motoristaId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "atualizadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Localizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recompensa" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataRecebimento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recompensa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaldoMotorista" (
    "id" SERIAL NOT NULL,
    "motoristaId" INTEGER NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaldoMotorista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Indicacao" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "indicadoId" INTEGER NOT NULL,
    "indicadorId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Indicacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaldoMotorista_motoristaId_key" ON "SaldoMotorista"("motoristaId");

-- CreateIndex
CREATE UNIQUE INDEX "Indicacao_codigo_key" ON "Indicacao"("codigo");

-- AddForeignKey
ALTER TABLE "Localizacao" ADD CONSTRAINT "Localizacao_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recompensa" ADD CONSTRAINT "Recompensa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaldoMotorista" ADD CONSTRAINT "SaldoMotorista_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicacao" ADD CONSTRAINT "Indicacao_indicadoId_fkey" FOREIGN KEY ("indicadoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicacao" ADD CONSTRAINT "Indicacao_indicadorId_fkey" FOREIGN KEY ("indicadorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
