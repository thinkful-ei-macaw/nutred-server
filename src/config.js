module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://postgres@localhost/nutred-db",
  JWT_SECRET: process.env.JWT_SECRET || "encryption-words-and-stuff",
};
