const express = require('express');
const router = express.Router();
const corridaController = require('../controllers/corridaController');
const autenticar = require('../middlewares/autenticar');

router.post('/corridas/chamar', autenticar, corridaController.chamarCorrida);
router.post('/corridas/:id/aceitar', autenticar, corridaController.aceitarCorrida);
router.post('/corridas/:id/iniciar', autenticar, corridaController.iniciarCorrida);
router.post('/corridas/:id/finalizar', autenticar, corridaController.finalizarCorrida);
router.get('/corridas/disponiveis', autenticar, corridaController.corridasDisponiveis);
router.get('/corridas/em-andamento', autenticar, corridaController.corridasEmAndamento);

module.exports = router;
