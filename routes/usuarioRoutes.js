const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.post('/cadastrar', UsuarioController.cadastrarUsuario);
router.post('/login', UsuarioController.loginUsuario);
router.get('/perfil/:id', UsuarioController.buscarPerfil);
router.put('/perfil/:id', UsuarioController.atualizarPerfil);

module.exports = router;



