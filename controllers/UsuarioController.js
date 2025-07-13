const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

module.exports = {
  async criar(req, res) {
    try {
      const {
        nome,
        email,
        senha,
        cpf,
        celular,
        codigoIndicacao,
        tipo
      } = req.body;

      if (!nome || !email || !senha || !cpf || !celular || !tipo) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      const cpfExistente = await Usuario.findOne({ where: { cpf } });
      if (cpfExistente) {
        return res.status(400).json({ error: 'CPF já cadastrado.' });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaCriptografada,
        cpf,
        celular,
        codigoIndicacao,
        tipo
      });

      return res.status(201).json({ message: 'Usuário criado com sucesso', usuario: novoUsuario });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
}; 
