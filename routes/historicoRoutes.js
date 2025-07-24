const express = require('express');
const router = express.Router();
const HistoricoController = require('../controllers/HistoricoController');

router.get('/passageiro/:id', HistoricoController.historicoPassageiro);
router.get('/motorista/:id', HistoricoController.historicoMotorista);

module.exports = router;
