const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();

app.use(cors());
app.use(express.json());

const usuarioRoutes = require('./routes/usuarioRoutes');
const corridaRoutes = require('./routes/corridaRoutes');

app.use('/usuarios', usuarioRoutes);
app.use('/corridas', corridaRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});


