// routes/recompensas.js
const express = require('express');
const router = express.Router();
const RecompensaController = require('../controllers/RecompensaController');
const auth = require('../middleware/auth');

router.get('/recompensas/:cpf', auth, RecompensaController.calcularRecompensa);

module.exports = router;


