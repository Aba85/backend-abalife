// caminho: routes/pagamentoRoutes.js

const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Atualizar forma de pagamento (PIX ou cartão)
router.post('/atualizar', authMiddleware, pagamentoController.atualizarFormaPagamento);

// Consultar forma de pagamento atual
router.get('/consultar', authMiddleware, pagamentoController.consultarFormaPagamento);

module.exports = router;
