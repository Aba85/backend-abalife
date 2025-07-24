const express = require('express');
const router = express.Router();
const RecompensaController = require('../controllers/RecompensaController');

router.get('/:id', RecompensaController.consultarRecompensas);

module.exports = router;


