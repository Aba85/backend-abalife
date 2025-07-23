function verificarAdmin(req, res, next) {
  if (req.usuario && req.usuario.tipo === 'admin') {
    return next();
  } else {
    return res.status(403).json({ mensagem: 'Acesso restrito a administradores.' });
  }
}

module.exports = verificarAdmin; 


