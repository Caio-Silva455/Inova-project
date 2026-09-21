const bcrypt = require("bcryptjs");
const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

async function listar() {
  const usuarios = await prisma.user.findMany({ orderBy: { nome: "asc" } });
  return usuarios.map(sanitizar);
}

async function buscarPorId(id) {
  const usuario = await prisma.user.findUnique({ where: { id: Number(id) } });
  if (!usuario) throw new AppError("Usuário não encontrado", 404);
  return sanitizar(usuario);
}

async function atualizar(id, dados) {
  const dataParaAtualizar = { ...dados };

  if (dataParaAtualizar.senha) {
    dataParaAtualizar.senha = await bcrypt.hash(dataParaAtualizar.senha, 10);
  }

  const usuario = await prisma.user.update({
    where: { id: Number(id) },
    data: dataParaAtualizar,
  });

  return sanitizar(usuario);
}

async function remover(id) {
  await prisma.user.delete({ where: { id: Number(id) } });
}

function sanitizar(usuario) {
  const { senha, ...resto } = usuario;
  return resto;
}

module.exports = { listar, buscarPorId, atualizar, remover };
