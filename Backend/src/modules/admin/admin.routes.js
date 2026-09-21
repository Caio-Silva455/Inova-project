const express = require("express");
const controller = require("./admin.controller");
const { autenticar, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.use(autenticar, requireRole("admin"));

router.get("/estatisticas", controller.estatisticas);
router.get("/alertas-recentes", controller.alertasRecentes);

module.exports = router;
