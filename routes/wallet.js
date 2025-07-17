const express = require('express');
const router = express.Router();
const WalletController = require('../controllers/WalletController');
const auth = require('../middleware/auth');

// Consulta de carteira
router.get('/', auth, WalletController.obterCarteira);

// Solicitar saque manual
router.post('/saque', auth, WalletController.solicitarSaque);

// Visualizar transações da carteira
router.get('/transacoes', auth, WalletController.historicoTransacoes);

module.exports = router;

