// utils/recompensaUtils.js

const { Passageiro, Motorista, Usuario, Corrida } = require('../models');

async function avaliarElegibilidadeRecompensa(corrida) {
  const passageiro = await Passageiro.findByPk(corrida.passageiroId);
  const indicante = passageiro.indicadoPor;

  if (!indicante) return;

  const usuarioIndicante = await Usuario.findByPk(indicante);
  if (!usuarioIndicante) return;

  const corridasIndicado = await Corrida.count({
    where: {
      passageiroId: passageiro.id,
      status: 'finalizada'
    }
  });

  let valor = 0;

  if (usuarioIndicante.tipo === 'passageiro') {
    const corridasUltimos30Dias = await Corrida.count({
      where: {
        passageiroId: indicante,
        status: 'finalizada',
        createdAt: {
          [require('sequelize').Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    });

    if (corridasUltimos30Dias >= 7) valor = 1;
    else if (corridasUltimos30Dias === 6) valor = 0.85;
    else if (corridasUltimos30Dias === 5) valor = 0.7;
    else if (corridasUltimos30Dias === 4) valor = 0.6;
    else if (corridasUltimos30Dias === 3) valor = 0.45;
    else if (corridasUltimos30Dias === 2) valor = 0.3;
    else if (corridasUltimos30Dias === 1) valor = 0.15;
  }

  if (usuarioIndicante.tipo === 'motorista') {
    const corridas48h = await Corrida.count({
      where: {
        motoristaId: indicante,
        status: 'finalizada',
        createdAt: {
          [require('sequelize').Op.gte]: new Date(Date.now() - 48 * 60 * 60 * 1000)
        }
      }
    });

    if (corridas48h >= 6) valor = 1;
    else if (corridas48h === 5) valor = 0.75;
    else if (corridas48h === 4) valor = 0.6;
    else if (corridas48h === 3) valor = 0.45;
    else if (corridas48h === 2) valor = 0.3;
    else if (corridas48h === 1) valor = 0.15;
  }

  // Aqui você pode salvar esse valor de recompensa, somar saldo etc.
  console.log(`Recompensa de R$${valor.toFixed(2)} aplicada ao indicante ${indicante}`);
}

module.exports = { avaliarElegibilidadeRecompensa };
