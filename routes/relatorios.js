const express = require('express');
const router = express.Router();
const RelatorioController = require('../controllers/RelatorioController');
const auth = require('../middleware/auth');

router.get('/relatorios/recompensas/:cpf', auth, RelatorioController.historicoRecompensas);

module.exports = router;
