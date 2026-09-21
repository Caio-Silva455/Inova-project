const AppError = require("../utils/AppError");

/**
 * Uso:
 *   const validate = require("../../middlewares/validate.middleware");
 *
 *   router.post("/", validate({
 *     nome: { obrigatorio: true, tipo: "string" },
 *     email: { obrigatorio: true, tipo: "string" },
 *     idade: { obrigatorio: false, tipo: "number" },
 *   }), controller.criar);
 */
function validate(regras) {
  return (req, res, next) => {
    const erros = [];
    const corpo = req.body || {}; // evita quebrar se vier sem Content-Type: application/json

    for (const [campo, regra] of Object.entries(regras)) {
      const valor = corpo[campo];

      if (regra.obrigatorio && (valor === undefined || valor === null || valor === "")) {
        erros.push(`Campo "${campo}" é obrigatório`);
        continue;
      }

      if (valor !== undefined && regra.tipo && typeof valor !== regra.tipo) {
        erros.push(`Campo "${campo}" deve ser do tipo ${regra.tipo}`);
      }
    }

    if (erros.length > 0) {
      return next(new AppError(erros.join("; "), 422));
    }

    next();
  };
}

module.exports = validate;
