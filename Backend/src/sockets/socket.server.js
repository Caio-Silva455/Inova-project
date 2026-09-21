const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, CORS_ORIGIN } = require("../config/env");
const logger = require("../utils/logger");

let ioInstance = null;

function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: CORS_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.replace("Bearer ", "");

      if (!token) return next(new Error("Token ausente"));

      const decoded = jwt.verify(token, JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Token inválido"));
    }
  });

  io.on("connection", (socket) => {
    logger.info(`[socket] cliente conectado: ${socket.id} (user ${socket.user?.id})`);

    socket.on("subscribe:idoso", (idosoId) => {
      socket.join(`idoso:${idosoId}`);
    });

    socket.on("unsubscribe:idoso", (idosoId) => {
      socket.leave(`idoso:${idosoId}`);
    });

    socket.on("disconnect", (reason) => {
      logger.info(`[socket] cliente desconectado: ${socket.id} (${reason})`);
    });
  });

  ioInstance = io;
  return io;
}

function getIO() {
  if (!ioInstance) {
    throw new Error("Socket.io não inicializado. Chame initSocket() antes de usar getIO()/emitAlerta().");
  }
  return ioInstance;
}

const TIPOS_ALERTA = {
  QUEDA: "queda",
  FREQUENCIA_BAIXA: "frequencia_baixa",
  FREQUENCIA_ALTA: "frequencia_alta",
  FORA_DA_AREA: "fora_da_area",
};

function emitAlerta({ idosoId, tipo, dados = {}, severidade = "alta" }) {
  const io = getIO();

  const alerta = { idosoId, tipo, severidade, dados, timestamp: new Date().toISOString() };

  io.to(`idoso:${idosoId}`).emit("alerta:novo", alerta);
  io.emit("alerta:global", alerta);

  return alerta;
}

module.exports = { initSocket, getIO, emitAlerta, TIPOS_ALERTA };
