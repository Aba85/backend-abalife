// validators/usuarioValidator.js
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

function validarTelefone(telefone) {
  return /^\d{10,11}$/.test(telefone); // Ex: 71991234567
}

function validarSenha(senha, confirmacao) {
  return senha.length >= 6 && senha === confirmacao;
}

module.exports = {
  validarCPF,
  validarTelefone,
  validarSenha
};

