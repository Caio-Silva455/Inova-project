const express = require("express");
const controller = require("./idosos.controller");
const { autenticar } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.use(autenticar); // todas as rotas de idosos exigem login

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);

router.post(
  "/",
  validate({ nome: { obrigatorio: true, tipo: "string" } }),
  controller.criar
);

router.put("/:id", controller.atualizar);
router.delete("/:id", controller.remover);

module.exports = router;
