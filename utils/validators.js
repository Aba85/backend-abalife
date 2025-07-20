function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

function validarTelefone(telefone) {
  const regex = /^[1-9]{2}9[0-9]{8}$/; // Exemplo: 71999999999
  return regex.test(telefone);
}

function validarSenha(senha, confirmarSenha) {
  if (!senha || senha.length < 6) {
    return { valido: false, mensagem: 'A senha deve ter pelo menos 6 caracteres.' };
  }
  if (senha !== confirmarSenha) {
    return { valido: false, mensagem: 'As senhas nÃ£o coincidem.' };
  }
  return { valido: true };
}

module.exports = {
  validarCPF,
  validarTelefone,
  validarSenha
};



