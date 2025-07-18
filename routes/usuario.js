const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/UsuarioController');

router.post('/usuarios/cadastrar', usuarioController.cadastrarUsuario);
router.post('/usuarios/login', usuarioController.loginUsuario);

module.exports = router;
