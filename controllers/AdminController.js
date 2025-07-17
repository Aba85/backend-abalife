// controllers/AdminController.js
const { Usuario, Corrida, Indicacao } = require('../prisma/client');

const listarUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

const listarIndicacoes = async (req, res) => {
  const indicacoes = await Indicacao.findAll();
  res.json(indicacoes);
};

const listarCorridas = async (req, res) => {
  const corridas = await Corrida.findAll({ order: [['data', 'DESC']] });
  res.json(corridas);
};

module.exports = {
  listarUsuarios,
  listarCorridas,
  listarIndicacoes
};

