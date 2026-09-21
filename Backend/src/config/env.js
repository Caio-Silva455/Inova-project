require("dotenv").config();

const obrigatorias = ["DATABASE_URL", "JWT_SECRET"];

for (const chave of obrigatorias) {
  if (!process.env[chave]) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${chave}`);
  }
}

module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "8h",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:4200",
};
