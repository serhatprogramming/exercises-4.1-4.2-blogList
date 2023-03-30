const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash =
      password && password.length >= 3
        ? await bcrypt.hash(password, saltRounds)
        : password
        ? undefined
        : password;

    const user = new User({
      username,
      passwordHash,
      name,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.status(200).json(users);
});

module.exports = usersRouter;
