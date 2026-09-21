const express = require("express");

const authRoutes = require("../modules/auth/auth.routes");
const idososRoutes = require("../modules/idosos/idosos.routes");
const alertasRoutes = require("../modules/alertas/alertas.routes");
const usersRoutes = require("../modules/users/users.routes");
const adminRoutes = require("../modules/admin/admin.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/idosos", idososRoutes);
router.use("/alertas", alertasRoutes);
router.use("/users", usersRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
