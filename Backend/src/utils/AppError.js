class AppError extends Error {
  constructor(mensagem, statusCode = 400) {
    super(mensagem);
    this.statusCode = statusCode;
    this.isAppError = true;
  }
}

module.exports = AppError;
