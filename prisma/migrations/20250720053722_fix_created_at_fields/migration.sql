/*
  Warnings:

  - The primary key for the `Carteiras` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `saldo` on the `Carteiras` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - The primary key for the `Corridas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `destino` on the `Corridas` table. All the data in the column will be lost.
  - You are about to drop the column `horarioAgendado` on the `Corridas` table. All the data in the column will be lost.
  - You are about to drop the column `origem` on the `Corridas` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Corridas` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Corridas` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Corridas` table. All the data in the column will be lost.
  - The primary key for the `Recompensas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `descricao` on the `Recompensas` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Recompensas` table. All the data in the column will be lost.
  - The primary key for the `Usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `BairroPrioridades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CodigoIndicacaos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CorridaAgendadas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Denuncia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Documentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmailEnviados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoricoIndicacaos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoricoSelfies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Identidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Indicacaos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LogAcessos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MensagemSuportes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Saques` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transacaos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Veiculos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `agenda_corridas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `avaliacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bairros_prioridade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carteiras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `corridas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `denuncias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `documentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `emails_enviados` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `historico_indicacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `historico_selfies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logs_acesso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mensagens_suporte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pagamentos_pessoais` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paradas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recompensas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saques` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `veiculos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Carteiras` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - Made the column `saldo` on table `Carteiras` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `dataHora` to the `Corridas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localFim` to the `Corridas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localInicio` to the `Corridas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passageiroId` to the `Corridas` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `Corridas` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `data` to the `Recompensas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Recompensas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Made the column `cpf` on table `Usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Indicacaos" DROP CONSTRAINT "Indicacaos_indicadoId_fkey";

-- DropForeignKey
ALTER TABLE "Indicacaos" DROP CONSTRAINT "Indicacaos_indicanteId_fkey";

-- DropForeignKey
ALTER TABLE "Recompensas" DROP CONSTRAINT "Recompensas_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Saques" DROP CONSTRAINT "Saques_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Transacaos" DROP CONSTRAINT "Transacaos_usuario_id_fkey";

-- AlterTable
ALTER TABLE "Carteiras" DROP CONSTRAINT "Carteiras_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "usuarioId" SET DATA TYPE TEXT,
ALTER COLUMN "saldo" SET NOT NULL,
ALTER COLUMN "saldo" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "createdAt" SET DEFAULT now(),
ADD CONSTRAINT "Carteiras_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Carteiras_id_seq";

-- AlterTable
ALTER TABLE "Corridas" DROP CONSTRAINT "Corridas_pkey",
DROP COLUMN "destino",
DROP COLUMN "horarioAgendado",
DROP COLUMN "origem",
DROP COLUMN "tipo",
DROP COLUMN "usuarioId",
DROP COLUMN "valor",
ADD COLUMN     "dataHora" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "localFim" TEXT NOT NULL,
ADD COLUMN     "localInicio" TEXT NOT NULL,
ADD COLUMN     "motoristaId" TEXT,
ADD COLUMN     "passageiroId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DEFAULT now(),
ADD CONSTRAINT "Corridas_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Corridas_id_seq";

-- AlterTable
ALTER TABLE "Recompensas" DROP CONSTRAINT "Recompensas_pkey",
DROP COLUMN "descricao",
DROP COLUMN "status",
ADD COLUMN     "corridaId" TEXT,
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "usuarioId" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DEFAULT now(),
ADD CONSTRAINT "Recompensas_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Recompensas_id_seq";

-- AlterTable
ALTER TABLE "Usuarios" DROP CONSTRAINT "Usuarios_pkey",
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "senha" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "nome" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "cpf" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DEFAULT now(),
ADD CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Usuarios_id_seq";

-- DropTable
DROP TABLE "BairroPrioridades";

-- DropTable
DROP TABLE "CodigoIndicacaos";

-- DropTable
DROP TABLE "CorridaAgendadas";

-- DropTable
DROP TABLE "Denuncia";

-- DropTable
DROP TABLE "Documentos";

-- DropTable
DROP TABLE "EmailEnviados";

-- DropTable
DROP TABLE "HistoricoIndicacaos";

-- DropTable
DROP TABLE "HistoricoSelfies";

-- DropTable
DROP TABLE "Identidades";

-- DropTable
DROP TABLE "Indicacaos";

-- DropTable
DROP TABLE "LogAcessos";

-- DropTable
DROP TABLE "MensagemSuportes";

-- DropTable
DROP TABLE "Saques";

-- DropTable
DROP TABLE "Transacaos";

-- DropTable
DROP TABLE "Veiculos";

-- DropTable
DROP TABLE "agenda_corridas";

-- DropTable
DROP TABLE "avaliacoes";

-- DropTable
DROP TABLE "bairros_prioridade";

-- DropTable
DROP TABLE "carteiras";

-- DropTable
DROP TABLE "corridas";

-- DropTable
DROP TABLE "denuncias";

-- DropTable
DROP TABLE "documentos";

-- DropTable
DROP TABLE "emails_enviados";

-- DropTable
DROP TABLE "historico_indicacoes";

-- DropTable
DROP TABLE "historico_selfies";

-- DropTable
DROP TABLE "logs_acesso";

-- DropTable
DROP TABLE "mensagens_suporte";

-- DropTable
DROP TABLE "pagamentos_pessoais";

-- DropTable
DROP TABLE "paradas";

-- DropTable
DROP TABLE "recompensas";

-- DropTable
DROP TABLE "saques";

-- DropTable
DROP TABLE "transacoes";

-- DropTable
DROP TABLE "usuarios";

-- DropTable
DROP TABLE "veiculos";

-- DropEnum
DROP TYPE "enum_BairroPrioridades_tipo_prioridade";

-- DropEnum
DROP TYPE "enum_Corridas_tipo";

-- DropEnum
DROP TYPE "enum_Denuncia_tipo_alvo";

-- DropEnum
DROP TYPE "enum_Documentos_tipo_documento";

-- DropEnum
DROP TYPE "enum_EmailEnviados_tipo";

-- DropEnum
DROP TYPE "enum_HistoricoIndicacaos_tipo";

-- DropEnum
DROP TYPE "enum_HistoricoSelfies_tipo";

-- DropEnum
DROP TYPE "enum_LogAcessos_tipo_usuario";

-- DropEnum
DROP TYPE "enum_MensagemSuportes_tipo_usuario";

-- DropEnum
DROP TYPE "enum_Recompensas_status";

-- DropEnum
DROP TYPE "enum_Saques_status";

-- DropEnum
DROP TYPE "enum_Saques_tipo";

-- DropEnum
DROP TYPE "enum_Transacaos_tipo";

-- DropEnum
DROP TYPE "enum_Veiculos_categoria";

-- DropEnum
DROP TYPE "enum_agenda_corridas_categoria";

-- DropEnum
DROP TYPE "enum_agenda_corridas_status";

-- DropEnum
DROP TYPE "enum_avaliacoes_tipo";

-- DropEnum
DROP TYPE "enum_bairros_prioridade_tipo_prioridade";

-- DropEnum
DROP TYPE "enum_carteiras_tipo";

-- DropEnum
DROP TYPE "enum_corridas_forma_pagamento";

-- DropEnum
DROP TYPE "enum_corridas_status";

-- DropEnum
DROP TYPE "enum_denuncias_status";

-- DropEnum
DROP TYPE "enum_denuncias_tipo_alvo";

-- DropEnum
DROP TYPE "enum_documentos_status";

-- DropEnum
DROP TYPE "enum_documentos_tipo_documento";

-- DropEnum
DROP TYPE "enum_emails_enviados_status_envio";

-- DropEnum
DROP TYPE "enum_emails_enviados_tipo";

-- DropEnum
DROP TYPE "enum_historico_indicacoes_tipo";

-- DropEnum
DROP TYPE "enum_historico_selfies_resultado";

-- DropEnum
DROP TYPE "enum_historico_selfies_tipo";

-- DropEnum
DROP TYPE "enum_logs_acesso_tipo_usuario";

-- DropEnum
DROP TYPE "enum_mensagens_suporte_status";

-- DropEnum
DROP TYPE "enum_mensagens_suporte_tipo_usuario";

-- DropEnum
DROP TYPE "enum_recompensas_status";

-- DropEnum
DROP TYPE "enum_recompensas_tipo";

-- DropEnum
DROP TYPE "enum_saques_status";

-- DropEnum
DROP TYPE "enum_saques_tipo";

-- DropEnum
DROP TYPE "enum_transacoes_origem";

-- DropEnum
DROP TYPE "enum_transacoes_tipo";

-- DropEnum
DROP TYPE "enum_usuarios_tipo";

-- DropEnum
DROP TYPE "enum_veiculos_categoria";

-- DropEnum
DROP TYPE "enum_veiculos_status";

-- CreateIndex
CREATE UNIQUE INDEX "Carteiras_usuarioId_key" ON "Carteiras"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_cpf_key" ON "Usuarios"("cpf");

-- AddForeignKey
ALTER TABLE "Corridas" ADD CONSTRAINT "Corridas_passageiroId_fkey" FOREIGN KEY ("passageiroId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Corridas" ADD CONSTRAINT "Corridas_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recompensas" ADD CONSTRAINT "Recompensas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recompensas" ADD CONSTRAINT "Recompensas_corridaId_fkey" FOREIGN KEY ("corridaId") REFERENCES "Corridas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carteiras" ADD CONSTRAINT "Carteiras_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
