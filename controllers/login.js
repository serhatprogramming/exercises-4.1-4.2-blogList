const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    const isPasswordCorrect =
      user !== null ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!(user && isPasswordCorrect)) {
      return response
        .status(401)
        .json({ error: "Username or Password is incorrect" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
