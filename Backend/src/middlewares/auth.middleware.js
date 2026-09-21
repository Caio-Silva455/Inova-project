const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const AppError = require("../utils/AppError");

function autenticar(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      throw new AppError("Token de autenticação ausente", 401);
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, role, email }
    next();
  } catch (err) {
    if (err.isAppError) return next(err);
    next(new AppError("Token inválido ou expirado", 401));
  }
}

// Uso: router.get("/", autenticar, requireRole("admin"), controller)
function requireRole(...rolesPermitidas) {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidas.includes(req.user.role)) {
      return next(new AppError("Você não tem permissão para acessar este recurso", 403));
    }
    next();
  };
}

module.exports = { autenticar, requireRole };
