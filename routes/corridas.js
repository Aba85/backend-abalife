// routes/corridas.js
const express = require('express');
const router = express.Router();
const CorridaController = require('../controllers/CorridaController');

router.post('/corridas/chamar', CorridaController.chamarCorrida);
router.post('/corridas/:corridaId/aceitar', CorridaController.aceitarCorrida);
router.post('/corridas/:corridaId/iniciar', CorridaController.iniciarCorrida);
router.post('/corridas/:corridaId/finalizar', CorridaController.finalizarCorrida);
router.get('/corridas', CorridaController.listarCorridas);

module.exports = router;

