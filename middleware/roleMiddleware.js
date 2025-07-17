// middlewares/roleMiddleware.js
const jwt = require('jsonwebtoken');

const roleMiddleware = (rolePermitido) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ erro: 'Token não fornecido.' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.perfil !== rolePermitido) {
        return res.status(403).json({ erro: 'Acesso negado para este perfil.' });
      }

      req.usuarioId = decoded.id;
      req.perfil = decoded.perfil;
      next();
    } catch (err) {
      return res.status(401).json({ erro: 'Token inválido.' });
    }
  };
};

module.exports = roleMiddleware;

