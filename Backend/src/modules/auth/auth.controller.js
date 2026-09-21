const authService = require("./auth.service");

async function registrar(req, res, next) {
  try {
    const usuario = await authService.registrar(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const resultado = await authService.login(req.body);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
}

module.exports = { registrar, login };
