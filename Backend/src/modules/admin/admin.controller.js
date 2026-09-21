const adminService = require("./admin.service");

async function estatisticas(req, res, next) {
  try {
    res.json(await adminService.obterEstatisticas());
  } catch (err) {
    next(err);
  }
}

async function alertasRecentes(req, res, next) {
  try {
    const limite = Number(req.query.limite) || 20;
    res.json(await adminService.alertasRecentes(limite));
  } catch (err) {
    next(err);
  }
}

module.exports = { estatisticas, alertasRecentes };
