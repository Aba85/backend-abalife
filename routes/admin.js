const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// Rotas administrativas â€” somente para usuÃ¡rios com perfil admin
router.get('/usuarios', auth, adminOnly, AdminController.listarTodosUsuarios);
router.get('/recompensas', auth, adminOnly, AdminController.listarTodasRecompensas);
router.get('/saques', auth, adminOnly, AdminController.listarTodosSaques);
router.get('/indicacoes', auth, adminOnly, AdminController.listarTodasIndicacoes);

module.exports = router;



