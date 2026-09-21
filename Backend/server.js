const http = require("http");
const app = require("./src/app");
const { initSocket } = require("./src/sockets/socket.server");
const { PORT } = require("./src/config/env");
const logger = require("./src/utils/logger");
const prisma = require("./src/config/prisma");

const httpServer = http.createServer(app);

initSocket(httpServer);

async function iniciar() {
  const inicio = Date.now();
  logger.info("Conectando ao banco de dados...");

  try {
    await prisma.$connect(); // força a conexão AGORA, não na primeira query de um usuário
    logger.info(`Conectado ao banco em ${Date.now() - inicio}ms`);
  } catch (err) {
    logger.error("Falha ao conectar no banco de dados:", err.message);
    process.exit(1); // sem banco, não faz sentido o servidor subir "meio vivo"
  }

  httpServer.listen(PORT, () => {
    logger.info(`Servidor rodando na porta ${PORT}`);
  });
}

iniciar();
