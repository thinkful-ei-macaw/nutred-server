const express = require("express");
const RegisterService = require("./register-service");
const registerRouter = express.Router();
const jsonBodyParser = express.json();
const path = require("path");

registerRouter.post("/", jsonBodyParser, (req, res, next) => {
  const { password, user_name, full_name } = req.body;
  for (const field of ["full_name", "user_name", "password"])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`,
      });

  const passwordError = RegisterService.validatePassword(password);
  if (passwordError) {
    return res.status(400).json({
      error: passwordError,
    });
  }
  RegisterService.hasUserWithUserName(req.app.get("db"), user_name)
    .then((hasUserWithUserName) => {
      if (hasUserWithUserName)
        return res.status(400).json({ error: `Username already taken` });

      return RegisterService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          user_name,
          password: hashedPassword,
          full_name,
          // date_created: "now()",
        };

        return RegisterService.insertUser(req.app.get("db"), newUser).then(
          (user) => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${user.id}`))
              .json(RegisterService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});

module.exports = registerRouter;
