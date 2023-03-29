const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    console.log("Password: " + password);
    const passwordHash =
      password && password.length >= 3
        ? await bcrypt.hash(password, saltRounds)
        : password.length < 3
        ? password
        : undefined;

    const user = new User({
      username,
      passwordHash,
      name,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    console.log("Duplicate Error: " + error.message);
    next(error);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.status(200).json(users);
});

module.exports = usersRouter;
