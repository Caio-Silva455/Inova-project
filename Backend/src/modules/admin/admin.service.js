const prisma = require("../../config/prisma");

async function obterEstatisticas() {
  const [totalIdosos, totalCuidadores, alertasNaoLidos, alertasHoje] = await Promise.all([
    prisma.idoso.count(),
    prisma.user.count({ where: { role: "cuidador" } }),
    prisma.alerta.count({ where: { lido: false } }),
    prisma.alerta.count({
      where: {
        createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
  ]);

  return { totalIdosos, totalCuidadores, alertasNaoLidos, alertasHoje };
}

async function alertasRecentes(limite = 20) {
  return prisma.alerta.findMany({
    orderBy: { createdAt: "desc" },
    take: limite,
    include: { idoso: { select: { nome: true } } },
  });
}

module.exports = { obterEstatisticas, alertasRecentes };
