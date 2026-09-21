const express = require("express");
const controller = require("./alertas.controller");
const { autenticar } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

// Rotas consultadas pelo painel (exigem login)
router.get("/idoso/:idosoId", autenticar, controller.listarPorIdoso);
router.patch("/:id/lido", autenticar, controller.marcarComoLido);

// Rotas de ingestão de sensores/dispositivos — normalmente autenticadas
// com uma API key própria do dispositivo, não com JWT de usuário.
// Ajuste para o seu esquema de auth de device quando definir isso.
router.post(
  "/sensores/queda",
  validate({ idosoId: { obrigatorio: true } }),
  controller.receberQueda
);

router.post(
  "/sensores/frequencia-cardiaca",
  validate({ idosoId: { obrigatorio: true }, bpm: { obrigatorio: true, tipo: "number" } }),
  controller.receberFrequenciaCardiaca
);

module.exports = router;
