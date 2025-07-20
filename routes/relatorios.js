const express = require('express');
const router = express.Router();
const RelatorioController = require('../controllers/RelatorioController');
const auth = require('../middleware/auth');

router.get('/recompensas', auth, RelatorioController.historico);

module.exports = router;



