const express = require('express');
const router = express.Router();
const IndicacaoController = require('../controllers/IndicacaoController');
const auth = require('../middlewares/auth');

// Registrar código de indicação (caso não tenha informado no cadastro)
router.post('/vincular', auth, IndicacaoController.vincularIndicacao);

// Verificar código do próprio usuário
router.get('/codigo', auth, IndicacaoController.meuCodigoIndicacao);

// Verificar lista de indicados
router.get('/meus-indicados', auth, IndicacaoController.listarIndicados);

module.exports = router;





