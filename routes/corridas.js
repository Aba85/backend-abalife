const express = require('express');
const router = express.Router();
const corridaController = require('../controllers/corridaController');

router.post('/chamar', corridaController.chamarCorrida);
router.get('/usuario/:usuarioId', corridaController.listarCorridasUsuario);

module.exports = router;


