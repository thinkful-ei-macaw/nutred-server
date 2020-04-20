const express = require("express");
const BiometricsService = require("./biometrics-service");
const biometricsRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require("../middleware/jwt-auth");

// biometricsRouter.use(requireAuth);

biometricsRouter
  .route("/")
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { height, user_weight, activity, gender, age } = req.body;
    const user_id = req.user.id;
    const biometricsUser = {
      height,
      user_weight,
      activity,
      user_id,
      gender,
      age,
    };

    BiometricsService.insertBiometrics(req.app.get("db"), biometricsUser)
      .then((biometrics) => {
        res.status(201).json({ biometrics });
      })
      .catch((err) => {
        if (err) return res.status(400).json({ error: err.message });
        next(err);
      });
  });

biometricsRouter
  .route("/")
  .get(requireAuth, jsonBodyParser, (req, res, next) => {
    const user_id = req.user.id;
    BiometricsService.getBiometricsById(req.app.get("db"), user_id)
      .then((user) => {
        return res.json(user);
      })
      .catch(next);
  });

module.exports = biometricsRouter;
