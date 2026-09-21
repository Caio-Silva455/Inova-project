const express = require("express");
const controller = require("./users.controller");
const { autenticar, requireRole } = require("../../middlewares/auth.middleware");

const router = express.Router();

router.use(autenticar);

router.get("/", requireRole("admin"), controller.listar);
router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.delete("/:id", requireRole("admin"), controller.remover);

module.exports = router;
