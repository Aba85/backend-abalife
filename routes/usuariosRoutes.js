const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Rota de cadastro de novo usuário
router.post('/', UsuarioController.criar);

// Rota de listagem ainda não implementada — deixar comentada por enquanto
// router.get('/', UsuarioController.index);

module.exports = router; 