const express = require("express");
// const BiometricsService = require("./info-service");
const biometricsRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require("../middleware/jwt-auth");


biometricsRouter.use(requireAuth);

biometricsRouter.post('/', jsonBodyParser, (req, res, next) => {
    const { height, user_weight, activity } = req.body;
    const user_id = req.user.id;
    const
})