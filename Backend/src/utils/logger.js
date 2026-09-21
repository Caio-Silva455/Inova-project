function timestamp() {
  return new Date().toISOString();
}

module.exports = {
  info: (msg, ...args) => console.log(`[INFO ${timestamp()}] ${msg}`, ...args),
  warn: (msg, ...args) => console.warn(`[WARN ${timestamp()}] ${msg}`, ...args),
  error: (msg, ...args) => console.error(`[ERROR ${timestamp()}] ${msg}`, ...args),
};
