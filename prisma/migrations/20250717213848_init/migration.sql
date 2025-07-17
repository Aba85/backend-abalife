-- CreateEnum
CREATE TYPE "enum_BairroPrioridades_tipo_prioridade" AS ENUM ('bonus', 'bloqueio', 'teste');

-- CreateEnum
CREATE TYPE "enum_Corridas_tipo" AS ENUM ('imediata', 'agendada', 'personalizada');

-- CreateEnum
CREATE TYPE "enum_Denuncia_tipo_alvo" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_Documentos_tipo_documento" AS ENUM ('rg', 'cnh', 'comprovante_residencia', 'outro');

-- CreateEnum
CREATE TYPE "enum_EmailEnviados_tipo" AS ENUM ('cadastro', 'recuperacao_senha', 'recompensa', 'outro');

-- CreateEnum
CREATE TYPE "enum_HistoricoIndicacaos_tipo" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_HistoricoSelfies_tipo" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_LogAcessos_tipo_usuario" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_MensagemSuportes_tipo_usuario" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_Recompensas_status" AS ENUM ('disponivel', 'resgatado');

-- CreateEnum
CREATE TYPE "enum_Saques_status" AS ENUM ('pendente', 'processado', 'recusado');

-- CreateEnum
CREATE TYPE "enum_Saques_tipo" AS ENUM ('recompensa', 'corrida');

-- CreateEnum
CREATE TYPE "enum_Transacaos_tipo" AS ENUM ('corrida', 'recompensa', 'saque', 'ajuste', 'bonus');

-- CreateEnum
CREATE TYPE "enum_Veiculos_categoria" AS ENUM ('alpha', 'delta', 'omega', 'mala', 'entrega', 'arca');

-- CreateEnum
CREATE TYPE "enum_agenda_corridas_categoria" AS ENUM ('alpha', 'delta', 'omega', 'mala', 'entrega', 'arca');

-- CreateEnum
CREATE TYPE "enum_agenda_corridas_status" AS ENUM ('pendente', 'atribuida', 'cancelada', 'concluida');

-- CreateEnum
CREATE TYPE "enum_avaliacoes_tipo" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_bairros_prioridade_tipo_prioridade" AS ENUM ('bonus', 'bloqueio', 'teste');

-- CreateEnum
CREATE TYPE "enum_carteiras_tipo" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_corridas_forma_pagamento" AS ENUM ('dinheiro', 'pix', 'cartao');

-- CreateEnum
CREATE TYPE "enum_corridas_status" AS ENUM ('pendente', 'aceita', 'concluida', 'cancelada');

-- CreateEnum
CREATE TYPE "enum_denuncias_status" AS ENUM ('pendente', 'em_analise', 'resolvida');

-- CreateEnum
CREATE TYPE "enum_denuncias_tipo_alvo" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_documentos_status" AS ENUM ('pendente', 'validado', 'rejeitado');

-- CreateEnum
CREATE TYPE "enum_documentos_tipo_documento" AS ENUM ('rg', 'cnh', 'comprovante_residencia', 'outro');

-- CreateEnum
CREATE TYPE "enum_emails_enviados_status_envio" AS ENUM ('enviado', 'erro', 'pendente');

-- CreateEnum
CREATE TYPE "enum_emails_enviados_tipo" AS ENUM ('cadastro', 'recuperacao_senha', 'recompensa', 'outro');

-- CreateEnum
CREATE TYPE "enum_historico_indicacoes_tipo" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_historico_selfies_resultado" AS ENUM ('validada', 'rejeitada', 'pendente');

-- CreateEnum
CREATE TYPE "enum_historico_selfies_tipo" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_logs_acesso_tipo_usuario" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_mensagens_suporte_status" AS ENUM ('aberto', 'em_analise', 'resolvido');

-- CreateEnum
CREATE TYPE "enum_mensagens_suporte_tipo_usuario" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_recompensas_status" AS ENUM ('pendente', 'liberada', 'paga');

-- CreateEnum
CREATE TYPE "enum_recompensas_tipo" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_saques_status" AS ENUM ('pendente', 'aprovado', 'recusado', 'pago');

-- CreateEnum
CREATE TYPE "enum_saques_tipo" AS ENUM ('corrida', 'recompensa', 'ambos');

-- CreateEnum
CREATE TYPE "enum_transacoes_origem" AS ENUM ('sistema', 'admin', 'indicacao', 'corrida', 'outro');

-- CreateEnum
CREATE TYPE "enum_transacoes_tipo" AS ENUM ('corrida', 'recompensa', 'saque', 'ajuste', 'bonus');

-- CreateEnum
CREATE TYPE "enum_usuarios_tipo" AS ENUM ('motorista', 'passageiro');

-- CreateEnum
CREATE TYPE "enum_veiculos_categoria" AS ENUM ('alpha', 'delta', 'omega', 'mala', 'entrega', 'arca');

-- CreateEnum
CREATE TYPE "enum_veiculos_status" AS ENUM ('ativo', 'pendente', 'reprovado');

-- CreateTable
CREATE TABLE "BairroPrioridades" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cidade" VARCHAR(255) NOT NULL,
    "estado" VARCHAR(255) NOT NULL,
    "ativo" BOOLEAN DEFAULT true,
    "tipo_prioridade" "enum_BairroPrioridades_tipo_prioridade",
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "BairroPrioridades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carteiras" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "saldo" DECIMAL(10,2) DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Carteiras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodigoIndicacaos" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(255) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CodigoIndicacaos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorridaAgendadas" (
    "id" SERIAL NOT NULL,
    "passageiroCpf" VARCHAR(255) NOT NULL,
    "motoristaCpf" VARCHAR(255),
    "origem" VARCHAR(255) NOT NULL,
    "destino" VARCHAR(255) NOT NULL,
    "dataHoraAgendada" TIMESTAMPTZ(6) NOT NULL,
    "status" VARCHAR(255) DEFAULT 'pendente',
    "tipo" VARCHAR(255) NOT NULL,
    "valor" DOUBLE PRECISION,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CorridaAgendadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corridas" (
    "id" SERIAL NOT NULL,
    "origem" VARCHAR(255),
    "destino" VARCHAR(255),
    "status" VARCHAR(255),
    "valor" DECIMAL,
    "tipo" "enum_Corridas_tipo",
    "horarioAgendado" TIMESTAMPTZ(6),
    "usuarioId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Corridas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Denuncia" (
    "id" SERIAL NOT NULL,
    "autor_id" INTEGER NOT NULL,
    "alvo_id" INTEGER NOT NULL,
    "tipo_alvo" "enum_Denuncia_tipo_alvo" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Denuncia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documentos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_documento" "enum_Documentos_tipo_documento" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailEnviados" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "tipo" "enum_EmailEnviados_tipo",
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "EmailEnviados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricoIndicacaos" (
    "id" SERIAL NOT NULL,
    "indicador_id" INTEGER NOT NULL,
    "indicado_id" INTEGER NOT NULL,
    "tipo" "enum_HistoricoIndicacaos_tipo",
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "HistoricoIndicacaos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricoSelfies" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo" "enum_HistoricoSelfies_tipo",
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "HistoricoSelfies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identidades" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Identidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Indicacaos" (
    "id" SERIAL NOT NULL,
    "indicanteId" INTEGER NOT NULL,
    "indicadoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Indicacaos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAcessos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_usuario" "enum_LogAcessos_tipo_usuario",
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "LogAcessos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MensagemSuportes" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_usuario" "enum_MensagemSuportes_tipo_usuario",
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "MensagemSuportes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recompensas" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" "enum_Recompensas_status" DEFAULT 'disponivel',
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Recompensas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saques" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "status" "enum_Saques_status" DEFAULT 'pendente',
    "tipo" "enum_Saques_tipo" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Saques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacaos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo" "enum_Transacaos_tipo" NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMPTZ(6) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Transacaos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculos" (
    "id" SERIAL NOT NULL,
    "motorista_id" INTEGER NOT NULL,
    "modelo" VARCHAR(255) NOT NULL,
    "placa" VARCHAR(255) NOT NULL,
    "ano" INTEGER NOT NULL,
    "categoria" "enum_Veiculos_categoria",
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_corridas" (
    "id" SERIAL NOT NULL,
    "passageiro_id" INTEGER NOT NULL,
    "categoria" "enum_agenda_corridas_categoria" NOT NULL,
    "endereco_origem" VARCHAR(255) NOT NULL,
    "endereco_destino" VARCHAR(255) NOT NULL,
    "data_hora" TIMESTAMPTZ(6) NOT NULL,
    "status" "enum_agenda_corridas_status" DEFAULT 'pendente',
    "motorista_id" INTEGER,
    "valor_previsto" DOUBLE PRECISION,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "agenda_corridas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliacoes" (
    "id" SERIAL NOT NULL,
    "avaliador_id" INTEGER NOT NULL,
    "avaliado_id" INTEGER NOT NULL,
    "tipo" "enum_avaliacoes_tipo" NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "comentario" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bairros_prioridade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cidade" VARCHAR(255) NOT NULL,
    "estado" VARCHAR(255) NOT NULL,
    "ativo" BOOLEAN DEFAULT true,
    "tipo_prioridade" "enum_bairros_prioridade_tipo_prioridade" NOT NULL,
    "observacoes" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "bairros_prioridade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carteiras" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo" "enum_carteiras_tipo" NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ultima_atualizacao" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "carteiras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corridas" (
    "id" SERIAL NOT NULL,
    "id_motorista" INTEGER NOT NULL,
    "id_passageiro" INTEGER NOT NULL,
    "origem" VARCHAR(255) NOT NULL,
    "destino" VARCHAR(255) NOT NULL,
    "status" "enum_corridas_status" DEFAULT 'pendente',
    "distancia_km" DOUBLE PRECISION NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "forma_pagamento" "enum_corridas_forma_pagamento" NOT NULL,
    "data_hora" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "corridas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "denuncias" (
    "id" SERIAL NOT NULL,
    "autor_id" INTEGER NOT NULL,
    "alvo_id" INTEGER NOT NULL,
    "tipo_alvo" "enum_denuncias_tipo_alvo" NOT NULL,
    "corrida_id" INTEGER,
    "motivo" VARCHAR(255) NOT NULL,
    "descricao" TEXT,
    "status" "enum_denuncias_status" DEFAULT 'pendente',
    "data_denuncia" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "denuncias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_documento" "enum_documentos_tipo_documento" NOT NULL,
    "arquivo_url" VARCHAR(255) NOT NULL,
    "status" "enum_documentos_status" DEFAULT 'pendente',
    "motivo_rejeicao" VARCHAR(255),
    "data_envio" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emails_enviados" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "tipo" "enum_emails_enviados_tipo" NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "conteudo" TEXT,
    "status_envio" "enum_emails_enviados_status_envio" DEFAULT 'pendente',
    "data_envio" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "emails_enviados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_indicacoes" (
    "id" SERIAL NOT NULL,
    "indicador_id" INTEGER NOT NULL,
    "indicado_id" INTEGER NOT NULL,
    "tipo" "enum_historico_indicacoes_tipo" NOT NULL,
    "data_vinculo" TIMESTAMPTZ(6),
    "codigo_utilizado" VARCHAR(255),
    "ativo" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "historico_indicacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_selfies" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo" "enum_historico_selfies_tipo" NOT NULL,
    "imagem_url" VARCHAR(255) NOT NULL,
    "resultado" "enum_historico_selfies_resultado" DEFAULT 'pendente',
    "motivo_falha" VARCHAR(255),
    "data_envio" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "historico_selfies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_acesso" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_usuario" "enum_logs_acesso_tipo_usuario" NOT NULL,
    "acao" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255),
    "ip" VARCHAR(255),
    "dispositivo" VARCHAR(255),
    "data" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "logs_acesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagens_suporte" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_usuario" "enum_mensagens_suporte_tipo_usuario" NOT NULL,
    "mensagem" TEXT NOT NULL,
    "resposta_sistema" BOOLEAN DEFAULT false,
    "status" "enum_mensagens_suporte_status" DEFAULT 'aberto',
    "data_envio" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "mensagens_suporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos_pessoais" (
    "id" SERIAL NOT NULL,
    "motorista_id" INTEGER NOT NULL,
    "passageiro_id" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "valor_maximo" DOUBLE PRECISION NOT NULL,
    "aceito_pelo_app" BOOLEAN DEFAULT true,
    "data_corrida" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "pagamentos_pessoais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paradas" (
    "id" SERIAL NOT NULL,
    "corrida_id" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,
    "endereco" VARCHAR(255) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "tempo_espera" INTEGER DEFAULT 5,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "paradas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recompensas" (
    "id" SERIAL NOT NULL,
    "indicador_id" INTEGER NOT NULL,
    "indicado_id" INTEGER NOT NULL,
    "tipo" "enum_recompensas_tipo" NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" "enum_recompensas_status" DEFAULT 'pendente',
    "data_gerada" TIMESTAMPTZ(6),
    "referencia_corrida" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "recompensas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saques" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" "enum_saques_status" DEFAULT 'pendente',
    "tipo" "enum_saques_tipo" NOT NULL,
    "pix" VARCHAR(255) NOT NULL,
    "data_pedido" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "saques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transacoes" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo" "enum_transacoes_tipo" NOT NULL,
    "origem" "enum_transacoes_origem" NOT NULL,
    "descricao" VARCHAR(255),
    "valor" DOUBLE PRECISION NOT NULL,
    "data_transacao" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "transacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "tipo" "enum_usuarios_tipo" NOT NULL,
    "email" VARCHAR(255),
    "senha" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veiculos" (
    "id" SERIAL NOT NULL,
    "motorista_id" INTEGER NOT NULL,
    "modelo" VARCHAR(255) NOT NULL,
    "placa" VARCHAR(255) NOT NULL,
    "ano" INTEGER NOT NULL,
    "categoria" "enum_veiculos_categoria" NOT NULL,
    "status" "enum_veiculos_status" DEFAULT 'pendente',
    "observacoes" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CodigoIndicacaos_codigo_key" ON "CodigoIndicacaos"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculos_placa_key" ON "Veiculos"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "veiculos_placa_key" ON "veiculos"("placa");

-- AddForeignKey
ALTER TABLE "Indicacaos" ADD CONSTRAINT "Indicacaos_indicadoId_fkey" FOREIGN KEY ("indicadoId") REFERENCES "Usuarios"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicacaos" ADD CONSTRAINT "Indicacaos_indicanteId_fkey" FOREIGN KEY ("indicanteId") REFERENCES "Usuarios"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recompensas" ADD CONSTRAINT "Recompensas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saques" ADD CONSTRAINT "Saques_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacaos" ADD CONSTRAINT "Transacaos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
