# 📘 API Backend Aba Life

Documentação completa das rotas da API REST do sistema Aba Life (passageiro, motorista, admin).

---

## 🔐 Autenticação

### POST `/usuarios/login`

- **Descrição:** Login via CPF e senha.
- **Body:**
```json
{
  "cpf": "12345678900",
  "senha": "suaSenha"
}
