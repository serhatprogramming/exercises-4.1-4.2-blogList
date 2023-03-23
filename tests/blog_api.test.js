const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogMongooseObjects = initialBlogs.map((blog) => new Blog(blog));
  const savedPromises = blogMongooseObjects.map((blogObject) =>
    blogObject.save()
  );
  Promise.all(savedPromises);
});

test("blogs are returned as json in correct number", async () => {
  const blogs = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(blogs.body.length).toBe(initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
