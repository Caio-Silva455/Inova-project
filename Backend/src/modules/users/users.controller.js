const usersService = require("./users.service");

async function listar(req, res, next) {
  try {
    res.json(await usersService.listar());
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    res.json(await usersService.buscarPorId(req.params.id));
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    res.json(await usersService.atualizar(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await usersService.remover(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, buscarPorId, atualizar, remover };
