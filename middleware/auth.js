const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_segura';

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET);
    req.usuarioId = decoded.id;
    req.perfil = decoded.perfil;
    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido.' });
  }
};

module.exports = auth;



