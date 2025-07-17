const { Usuario } = require('../prisma/client');

module.exports = {
  async gerarCodigo(req, res) {
    try {
      const usuarioId = req.usuarioId;
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

      if (!usuario.codigoIndicacao) {
        usuario.codigoIndicacao = `${usuario.tipo}-${usuarioId}`.toUpperCase();
        await usuario.save();
      }

      return res.json({ codigo: usuario.codigoIndicacao });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao gerar código' });
    }
  }
};

