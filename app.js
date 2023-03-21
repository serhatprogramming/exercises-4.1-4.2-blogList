const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const config = require("./utils/config");
const Blog = require("./models/blog");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);

module.exports = app;
