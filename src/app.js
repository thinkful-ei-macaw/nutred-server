require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const authRouter = require("./auth/auth-router");
const { requireAuth } = require("./middleware/jwt-auth");
const registerRouter = require("./register/register-router");
const infoRouter = require("./info/info-router");
const biometricsRouter = require("./biometrics/biometrics-route");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(cors());
app.use(morgan(morganOption));
app.use(helmet());

app.use("/api/auth", authRouter);
app.use("/api/users", registerRouter);
app.use("/api/interests", infoRouter);
app.use("/api/biometrics", biometricsRouter);
app.get("/", requireAuth, (req, res) => {
  res.send("Hello, world!");
});

app.get("/api/login", (req, res) => {});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
