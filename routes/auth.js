// routes/auth.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/usuarios/login', AuthController.login);

module.exports = router;

