const express = require('express');
const router = express.Router();
const CorridaAgendadaController = require('../controllers/CorridaAgendadaController');
const auth = require('../middleware/auth');

router.post('/corridas/agendar', auth, CorridaAgendadaController.agendarCorrida);
router.get('/corridas/agendadas', auth, CorridaAgendadaController.listarCorridasAgendadas);

module.exports = router;

