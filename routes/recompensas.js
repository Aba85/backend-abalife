const express = require('express');
const router = express.Router();
const recompensaController = require('../controllers/recompensaController');

router.get('/passageiro/:usuarioId', recompensaController.recompensasPassageiro);

module.exports = router;


