const { validarCPF } = require('../utils/validators');

module.exports = (req, res, next) => {
  const { cpf } = req.body;

  if (!validarCPF(cpf)) {
    return res.status(400).json({ error: 'CPF inválido.' });
  }

  next();
};
