const express = require('express');
const app = express();
app.use(express.json()); // Para interpretar JSON

// Importa rotas
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

// Sequelize - conecta e sincroniza modelos
const sequelize = require('./models/index'); // conexão com o banco
const Usuario = require('./models/usuario'); // importa o model

// Sincroniza modelos com o banco
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar com o banco:', error);
  });

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 