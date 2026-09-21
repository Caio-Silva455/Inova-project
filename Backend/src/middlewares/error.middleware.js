const logger = require("../utils/logger");

// Deve ser o ÚLTIMO middleware registrado em app.js (depois de todas as rotas)
function errorMiddleware(err, req, res, next) {
  const statusCode = err.isAppError ? err.statusCode : 500;
  const mensagem = err.isAppError ? err.message : "Erro interno do servidor";

  if (statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} -> ${err.message}`, err.stack);
  } else {
    logger.warn(`${req.method} ${req.originalUrl} -> ${err.message}`);
  }

  res.status(statusCode).json({
    erro: mensagem,
  });
}

module.exports = errorMiddleware;
