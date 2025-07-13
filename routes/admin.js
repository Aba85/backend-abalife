// routes/admin.js
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.get('/admin/usuarios', AdminController.listarUsuarios);
router.get('/admin/corridas', AdminController.listarCorridas);
router.get('/admin/indicacoes', AdminController.listarIndicacoes);

module.exports = router;
