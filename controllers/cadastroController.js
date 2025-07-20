// caminho: controllers/cadastroController.js

const Usuario = require('../prisma/client/usuario');
const bcrypt = require('bcrypt');
const { gerarCodigoUnico } = require('../utils/geradorCodigo');
const validarCPF = require('../utils/cpfValidator');
const smsService = require('../services/smsService');

const codigosSMS = new Map(); // em memÃ³ria temporÃ¡ria

exports.registrarUsuario = async (req, res) => {
  try {
    const {
      nome,
      email,
      senha,
      cpf,
      celular,
      endereco,
      cep,
      indicadoPor,
      foto,
    } = req.body;

    // Verifica se jÃ¡ existe e-mail ou CPF
    const existente = await Usuario.findOne({ $or: [{ email }, { cpf }] });
    if (existente) return res.status(400).json({ mensagem: 'UsuÃ¡rio jÃ¡ cadastrado' });

    // Valida CPF
    if (!validarCPF(cpf)) return res.status(400).json({ mensagem: 'CPF invÃ¡lido' });

    // Criptografa senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Gera cÃ³digo Ãºnico
    let codigoUnico = '';
    let existe = true;
    while (existe) {
      codigoUnico = gerarCodigoUnico(6);
      const existente = await Usuario.findOne({ codigoIndicacao: codigoUnico });
      if (!existente) existe = false;
    }

    const usuario = new Usuario({
      nome,
      email,
      senha: senhaHash,
      cpf,
      celular,
      endereco,
      cep,
      foto,
      saldo: 0,
      codigoIndicacao: codigoUnico,
      indicadoPor,
    });

    await usuario.save();
    return res.status(201).json({ mensagem: 'UsuÃ¡rio cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ mensagem: 'Erro ao cadastrar usuÃ¡rio' });
  }
};

exports.enviarCodigoSMS = async (req, res) => {
  try {
    const { celular } = req.body;

    if (!celular || !celular.startsWith('+55')) {
      return res.status(400).json({ mensagem: 'NÃºmero invÃ¡lido' });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    codigosSMS.set(celular, codigo);

    await smsService.enviar(celular, `Seu cÃ³digo de verificaÃ§Ã£o Aba Life: ${codigo}`);
    res.json({ mensagem: 'CÃ³digo enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar SMS:', error);
    res.status(500).json({ mensagem: 'Falha no envio do cÃ³digo' });
  }
};

exports.verificarCodigoSMS = (req, res) => {
  const { celular, codigo } = req.body;

  const salvo = codigosSMS.get(celular);
  if (!salvo || salvo !== codigo) {
    return res.status(401).json({ mensagem: 'CÃ³digo invÃ¡lido' });
  }

  codigosSMS.delete(celular);
  res.json({ mensagem: 'VerificaÃ§Ã£o bem-sucedida' });
};



