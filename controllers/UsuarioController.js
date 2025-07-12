module.exports = {
  index(req, res) {
    res.json({ mensagem: 'Listando usuários do Aba Life' });
  },

  store(req, res) {
    const { nome, email, senha, cpf, celular } = req.body;

    if (!nome || !email || !senha || !cpf || !celular) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios (nome, email, senha, cpf, celular)' });
    }

    // Validação simples de CPF
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      return res.status(400).json({ erro: 'CPF inválido' });
    }

    // Validação simples de celular (11 dígitos, ex: 71999999999)
    const celularLimpo = celular.replace(/\D/g, '');
    if (celularLimpo.length !== 11) {
      return res.status(400).json({ erro: 'Celular inválido. Use DDD + número (ex: 71999999999)' });
    }

    // Resposta simulada
    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso',
      usuario: { nome, email, cpf, celular }
    });
  }
}; 