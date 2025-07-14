// routes/usuario.js

const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Rotas de autenticação
router.post('/cadastrar', UsuarioController.cadastrar);
router.post('/login', UsuarioController.login);
