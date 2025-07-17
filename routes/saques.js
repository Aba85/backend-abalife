// routes/saques.js
const express = require('express');
const router = express.Router();
const saqueController = require('../controllers/saqueController');
const autenticar = require('../middlewares/autenticar');

router.post('/solicitar', autenticar, saqueController.solicitarSaque);
router.get('/historico', autenticar, saqueController.historicoSaques);

module.exports = router;

