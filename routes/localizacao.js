// routes/localizacao.js

const express = require('express');
const router = express.Router();
const localizacaoController = require('../controllers/localizacaoController');

// Atualizar localização (passageiro ou motorista)
router.post('/atualizar', localizacaoController.atualizarLocalizacao);

// Buscar localização
router.get('/:usuarioId', localizacaoController.buscarLocalizacao);

module.exports = router;
