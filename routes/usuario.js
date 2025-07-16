const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

// Defina suas rotas aqui
router.post('/cadastrar', UsuarioController.cadastrar);
// Adicione outras rotas conforme necessário

module.exports = router; 