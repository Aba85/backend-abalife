const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/UsuarioController');

// Rota para cadastro de usuÃ¡rio
router.post('/cadastrar', usuarioController.cadastrarUsuario);

// Rota para login de usuÃ¡rio
router.post('/login', usuarioController.loginUsuario);

module.exports = router; 

