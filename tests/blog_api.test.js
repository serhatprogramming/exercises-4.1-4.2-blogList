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

test("blogs have id", async () => {
  const blogs = await api.get("/api/blogs");
  expect(blogs.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "title 3",
    author: "author 3",
    url: "www.url3.world",
    likes: 3333,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await blogsInDb();
  expect(blogs.length).toBe(initialBlogs.length + 1);

  const authors = blogs.map((blog) => blog.author);
  expect(authors).toContain("author 3");
});

afterAll(async () => {
  await mongoose.connection.close();
});
