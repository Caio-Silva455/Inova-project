const express = require("express");
const controller = require("./auth.controller");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.post(
  "/registrar",
  validate({
    nome: { obrigatorio: true, tipo: "string" },
    email: { obrigatorio: true, tipo: "string" },
    senha: { obrigatorio: true, tipo: "string" },
  }),
  controller.registrar
);

router.post(
  "/login",
  validate({
    email: { obrigatorio: true, tipo: "string" },
    senha: { obrigatorio: true, tipo: "string" },
  }),
  controller.login
);

module.exports = router;
