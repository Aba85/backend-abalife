const express = require('express');
const router = express.Router();
const MotoristaController = require('../controllers/MotoristaController');

router.post('/cadastrar', MotoristaController.cadastrarMotorista);
router.post('/login', MotoristaController.loginMotorista);
router.get('/perfil/:id', MotoristaController.buscarPerfil);

module.exports = router;
