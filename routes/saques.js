const express = require('express');
const router = express.Router();
const saqueController = require('../controllers/SaqueController');
const autenticar = require('../middlewares/autenticar');
const verificarAdmin = require('../middlewares/verificarAdmin');

// Passageiro ou motorista solicita um saque
router.post('/solicitar', autenticar, saqueController.solicitarSaque);

// Listar saques do usuário logado
router.get('/meus', autenticar, saqueController.listarSaques);

// Admin aprova um saque
if (typeof saqueController.aprovarSaque === 'function') {
  router.put('/aprovar/:id', autenticar, verificarAdmin, saqueController.aprovarSaque);
} else {
  console.warn('??  Função "aprovarSaque" não encontrada no SaqueController.');
}

// Admin recusa um saque
if (typeof saqueController.recusarSaque === 'function') {
  router.put('/recusar/:id', autenticar, verificarAdmin, saqueController.recusarSaque);
} else {
  console.warn('??  Função "recusarSaque" não encontrada no SaqueController.');
}

module.exports = router; 


