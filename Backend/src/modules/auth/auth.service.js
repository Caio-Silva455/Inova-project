const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../config/prisma");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/env");
const AppError = require("../../utils/AppError");

async function registrar({ nome, email, senha, role }) {
  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) {
    throw new AppError("Já existe um usuário com esse email", 409);
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.user.create({
    data: {
      nome,
      email,
      senha: senhaHash,
      role: role || "cuidador",
    },
  });

  return sanitizar(usuario);
}

async function login({ email, senha }) {
  const usuario = await prisma.user.findUnique({ where: { email } });
  if (!usuario) {
    throw new AppError("Email ou senha inválidos", 401);
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    throw new AppError("Email ou senha inválidos", 401);
  }

  const token = jwt.sign(
    { id: usuario.id, role: usuario.role, email: usuario.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, usuario: sanitizar(usuario) };
}

// Nunca devolver o hash da senha nas respostas da API
function sanitizar(usuario) {
  const { senha, ...resto } = usuario;
  return resto;
}

module.exports = { registrar, login };
