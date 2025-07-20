const express = require('express');
const router = express.Router();
const IndicacaoController = require('../controllers/IndicacaoController');
const auth = require('../middleware/auth');

// Registrar cÃ³digo de indicaÃ§Ã£o (caso nÃ£o tenha informado no cadastro)
router.post('/vincular', auth, IndicacaoController.vincularIndicacao);

// Verificar cÃ³digo do prÃ³prio usuÃ¡rio
router.get('/codigo', auth, IndicacaoController.meuCodigoIndicacao);

// Verificar lista de indicados
router.get('/meus-indicados', auth, IndicacaoController.listarIndicados);

module.exports = router;



