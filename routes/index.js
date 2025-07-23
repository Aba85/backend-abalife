const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const usuarioRoutes = require('./usuario');
const corridasRoutes = require('./corridas');
const corridasAgendadasRoutes = require('./corridasAgendadas');
const carteiraRoutes = require('./carteira');
const recompensasRoutes = require('./recompensas');
const saquesRoutes = require('./saques');
const indicacoesRoutes = require('./indicacoes');
const identidadeRoutes = require('./identidade');
const relatoriosRoutes = require('./relatorios');
const codigoRoutes = require('./codigo');
const adminRoutes = require('./admin');
const pagamentoRoutes = require('./pagamentoRoutes');
const historicoRoutes = require('./historico');

router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/corridas', corridasRoutes);
router.use('/corridas-agendadas', corridasAgendadasRoutes);
router.use('/carteira', carteiraRoutes);
router.use('/recompensas', recompensasRoutes);
router.use('/saques', saquesRoutes);
router.use('/indicacoes', indicacoesRoutes);
router.use('/identidade', identidadeRoutes);
router.use('/relatorios', relatoriosRoutes);
router.use('/codigo', codigoRoutes);
router.use('/admin', adminRoutes);
router.use('/pagamentos', pagamentoRoutes);
router.use('/historico', historicoRoutes);

module.exports = router; 


