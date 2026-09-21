const { PrismaClient } = require("@prisma/client");

// Singleton: todo o projeto importa essa mesma instância,
// em vez de cada arquivo criar seu próprio `new PrismaClient()`.
const prisma = new PrismaClient();

module.exports = prisma;
