const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const { emitAlerta, TIPOS_ALERTA } = require("../../sockets/socket.server");

// SQL Server não tem tipo Json nativo no Prisma, então "dados" é salvo
// como String (JSON.stringify) e precisa ser desserializado na leitura.

function paraSaida(alerta) {
  if (!alerta) return alerta;
  return {
    ...alerta,
    dados: alerta.dados ? JSON.parse(alerta.dados) : null,
  };
}

async function listarPorIdoso(idosoId) {
  const alertas = await prisma.alerta.findMany({
    where: { idosoId: Number(idosoId) },
    orderBy: { createdAt: "desc" },
  });

  return alertas.map(paraSaida);
}

async function marcarComoLido(id) {
  const alerta = await prisma.alerta.findUnique({ where: { id: Number(id) } });
  if (!alerta) throw new AppError("Alerta não encontrado", 404);

  const atualizado = await prisma.alerta.update({
    where: { id: Number(id) },
    data: { lido: true },
  });

  return paraSaida(atualizado);
}

async function registrarQueda(idosoId, dadosSensor = {}) {
  return registrarEEmitir(idosoId, TIPOS_ALERTA.QUEDA, "alta", dadosSensor);
}

async function registrarFrequenciaCardiaca(idosoId, bpm) {
  const LIMITE_BAIXO = 50;
  const LIMITE_ALTO = 130;

  if (bpm >= LIMITE_BAIXO && bpm <= LIMITE_ALTO) {
    return null; // dentro do normal, não gera alerta
  }

  const tipo = bpm < LIMITE_BAIXO ? TIPOS_ALERTA.FREQUENCIA_BAIXA : TIPOS_ALERTA.FREQUENCIA_ALTA;
  return registrarEEmitir(idosoId, tipo, "alta", { bpm });
}

async function registrarEEmitir(idosoId, tipo, severidade, dados) {
  const alerta = await prisma.alerta.create({
    data: {
      idosoId: Number(idosoId),
      tipo,
      severidade,
      dados: dados ? JSON.stringify(dados) : null, // serializa antes de salvar
    },
  });

  // no socket, emitimos o objeto original (não serializado) —
  // o Angular recebe "dados" já como objeto de verdade.
  emitAlerta({ idosoId: Number(idosoId), tipo, severidade, dados });

  return paraSaida(alerta);
}

module.exports = {
  listarPorIdoso,
  marcarComoLido,
  registrarQueda,
  registrarFrequenciaCardiaca,
};
