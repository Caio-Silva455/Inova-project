const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

async function listarPorResponsavel(responsavelId) {
  return prisma.idoso.findMany({
    where: { responsavelId: Number(responsavelId) },
    orderBy: { nome: "asc" },
  });
}

async function buscarPorId(id) {
  const idoso = await prisma.idoso.findUnique({
    where: { id: Number(id) },
    include: { alertas: { orderBy: { createdAt: "desc" }, take: 10 } },
  });

  if (!idoso) {
    throw new AppError("Idoso não encontrado", 404);
  }

  return idoso;
}

async function criar({ nome, dataNascimento, endereco, responsavelId }) {
  return prisma.idoso.create({
    data: {
      nome,
      dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
      endereco,
      responsavelId: Number(responsavelId),
    },
  });
}

async function atualizar(id, dados) {
  await buscarPorId(id); // garante que existe (lança 404 se não)

  return prisma.idoso.update({
    where: { id: Number(id) },
    data: {
      ...dados,
      dataNascimento: dados.dataNascimento ? new Date(dados.dataNascimento) : undefined,
    },
  });
}

async function remover(id) {
  await buscarPorId(id);
  return prisma.idoso.delete({ where: { id: Number(id) } });
}

module.exports = { listarPorResponsavel, buscarPorId, criar, atualizar, remover };
