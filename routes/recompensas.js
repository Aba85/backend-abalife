const express = require('express');
const router = express.Router();
const RecompensaController = require('../controllers/RecompensaController');
const auth = require('../middleware/auth');

// Consulta do status de recompensas
router.get('/status', auth, RecompensaController.statusRecompensas);

// Histórico de recompensas recebidas
router.get('/historico', auth, RecompensaController.historicoRecompensas);

module.exports = router;
