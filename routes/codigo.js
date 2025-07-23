const express = require('express');
const router = express.Router();
const CodigoController = require('../controllers/CodigoController');
const auth = require('../middlewares/auth');

router.get('/gerar', auth, CodigoController.gerarCodigo);

module.exports = router;





