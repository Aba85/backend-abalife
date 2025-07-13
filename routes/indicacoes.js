// routes/indicacoes.js
const express = require('express');
const router = express.Router();
const IndicacaoController = require('../controllers/IndicacaoController');

router.post('/indicacoes/vincular', IndicacaoController.registrarIndicacao);

module.exports = router;
