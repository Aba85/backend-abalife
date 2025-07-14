const express = require('express');
const router = express.Router();
const IdentidadeController = require('../controllers/IdentidadeController');
const auth = require('../middleware/auth');

router.post('/corridas/identidade', auth, IdentidadeController.confirmarIdentidade);

module.exports = router;
