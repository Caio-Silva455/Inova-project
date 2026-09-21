const alertasService = require("./alertas.service");

async function listarPorIdoso(req, res, next) {
  try {
    const alertas = await alertasService.listarPorIdoso(req.params.idosoId);
    res.json(alertas);
  } catch (err) {
    next(err);
  }
}

async function marcarComoLido(req, res, next) {
  try {
    const alerta = await alertasService.marcarComoLido(req.params.id);
    res.json(alerta);
  } catch (err) {
    next(err);
  }
}

// Endpoint chamado pelo dispositivo/sensor de queda (wearable, app do idoso, etc.)
async function receberQueda(req, res, next) {
  try {
    const { idosoId, dados } = req.body;
    const alerta = await alertasService.registrarQueda(idosoId, dados);
    res.status(201).json(alerta);
  } catch (err) {
    next(err);
  }
}

// Endpoint chamado pelo sensor de frequência cardíaca
async function receberFrequenciaCardiaca(req, res, next) {
  try {
    const { idosoId, bpm } = req.body;
    const alerta = await alertasService.registrarFrequenciaCardiaca(idosoId, bpm);
    res.status(alerta ? 201 : 200).json(alerta || { mensagem: "Frequência dentro do normal" });
  } catch (err) {
    next(err);
  }
}

module.exports = { listarPorIdoso, marcarComoLido, receberQueda, receberFrequenciaCardiaca };
