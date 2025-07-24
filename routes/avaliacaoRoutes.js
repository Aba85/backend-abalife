const express = require('express');
const router = express.Router();
const AvaliacaoController = require('../controllers/AvaliacaoController');

router.post('/', AvaliacaoController.enviarAvaliacao);
router.get('/motorista/:id', AvaliacaoController.mediaMotorista);
router.get('/passageiro/:id', AvaliacaoController.mediaPassageiro);

module.exports = router;
