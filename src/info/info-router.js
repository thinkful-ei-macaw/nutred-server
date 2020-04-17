const express = require("express");
const InfoService = require("./info-service");
const infoRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require("../middleware/jwt-auth");

infoRouter.use(requireAuth);

infoRouter.post("/", jsonBodyParser, (req, res, next) => {
  const {
    cooking = "0",
    exercise = "0",
    food_nutrition = "0",
    metabolism = "0",
  } = req.body;
  const user_id = req.user.id;
  const interestsUser = {
    cooking,
    exercise,
    food_nutrition,
    metabolism,
    user_id,
  };

  InfoService.insertInterests(req.app.get("db"), interestsUser)
    .then((interests) => {
      res.status(201).json({ interests });
    })
    .catch((err) => {
      if (err.code === "23505")
        return res.status(400).json({ error: err.message });
      next(err);
    });
});

infoRouter.get("/", (req, res, next) => {
  const user_id = req.user.id;
  InfoService.getInterestById(req.app.get("db"), user_id)
    .then((user) => {
      return res.json(user);
    })
    .catch(next);
});

module.exports = infoRouter;
