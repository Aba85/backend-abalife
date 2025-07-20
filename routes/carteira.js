// routes/carteira.js
const express = require('express');
const router = express.Router();
const carteiraController = require('../controllers/carteiraController');
const autenticar = require('../middlewares/autenticar');

router.get('/saldo', autenticar, carteiraController.consultarSaldo);
router.post('/usar', autenticar, carteiraController.usarSaldo);

module.exports = router;



