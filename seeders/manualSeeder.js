// seeders/manualSeeder.js
const bcrypt = require('bcryptjs');
const db = require('../models');

async function seed() {
  await db.sequelize.sync({ force: true });

  const senhaHash = await bcrypt.hash('senha123', 10);

  await db.Usuario.bulkCreate([
    {
      nome: 'Admin',
      email: 'admin@abalife.com',
      cpf: '00000000000',
      celular: '71000000000',
      senha: senhaHash,
      perfil: 'admin'
    },
    {
      nome: 'Passageiro Teste',
      email: 'p@teste.com',
      cpf: '12345678900',
      celular: '71999999999',
      senha: senhaHash,
      perfil: 'passageiro'
    },
    {
      nome: 'Motorista Teste',
      email: 'm@teste.com',
      cpf: '98765432100',
      celular: '71988888888',
      senha: senhaHash,
      perfil: 'motorista'
    }
  ]);

  console.log('Seed concluído com sucesso.');
  process.exit();
}

seed();
