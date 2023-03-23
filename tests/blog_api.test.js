const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
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

test("can post without likes can be defaulted to 0", async () => {
  const blogWithoutLikes = {
    title: "title 3",
    author: "author 3",
    url: "www.url3.world",
  };
  const savedBlog = await api
    .post("/api/blogs")
    .send(blogWithoutLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(savedBlog.body.likes).toBe(0);
});

test("missing title or url returns 400", async () => {
  const blogWithoutTitle = {
    author: "author 3",
    url: "www.url3.world",
  };
  const blogWithoutUrl = {
    author: "author 3",
    title: "title3",
  };
  await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
  await api.post("/api/blogs").send(blogWithoutUrl).expect(400);
});

describe("tests with specific blog", () => {
  test("delete a specific blog", async () => {
    const blogs = await blogsInDb();
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const remainingBlogs = await blogsInDb();
    expect(remainingBlogs.length).toBe(blogs.length - 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
