const express = require("express");
const cors = require("cors");
const { CORS_ORIGIN } = require("./config/env");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api", routes);

// Sempre por último: captura qualquer erro passado via next(err) nas rotas
app.use(errorMiddleware);

module.exports = app;
