const { v4: uuidv4 } = require('uuid');
const db = require('../prisma/client');

async function gerarCodigoParaUsuario(usuarioId, tipo) {
  const codigo = `${tipo.substring(0, 1)}-${uuidv4().split('-')[0]}`;

  await db.CodigoIndicacao.create({
    usuarioId,
    tipo,
    codigo
  });

  return codigo;
}

module.exports = {
  gerarCodigoParaUsuario
};





