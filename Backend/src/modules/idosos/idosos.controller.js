const idososService = require("./idosos.service");

async function listar(req, res, next) {
  try {
    // cada cuidador vê só os idosos dele; admin pode passar ?responsavelId=
    const responsavelId = req.query.responsavelId || req.user.id;
    const idosos = await idososService.listarPorResponsavel(responsavelId);
    res.json(idosos);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const idoso = await idososService.buscarPorId(req.params.id);
    res.json(idoso);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    const idoso = await idososService.criar({
      ...req.body,
      responsavelId: req.body.responsavelId || req.user.id,
    });
    res.status(201).json(idoso);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const idoso = await idososService.atualizar(req.params.id, req.body);
    res.json(idoso);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await idososService.remover(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
