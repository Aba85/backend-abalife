// routes/identidade.js
const express = require('express');
const router = express.Router();
const IdentidadeController = require('../controllers/IdentidadeController');

router.post('/corridas/identidade', IdentidadeController.confirmarIdentidade);

module.exports = router;
