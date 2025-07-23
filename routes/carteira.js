// routes/carteira.js
const express = require('express');
const router = express.Router();
const CarteiraController = require('../controllers/CarteiraController');
const autenticar = require('../middlewares/autenticar');

// Rota para obter o saldo da carteira
router.get('/saldo', autenticar, CarteiraController.obterSaldo);

// Rota para usar o saldo em uma viagem
router.post('/usar-saldo', autenticar, CarteiraController.usarSaldoEmViagem);

module.exports = router; 


