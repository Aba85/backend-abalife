const express = require('express');
const app = express();

app.use(express.json()); // Para interpretar JSON

// Importa e usa a rota
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

// Inicialização
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
