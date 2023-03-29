const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "title 1",
    author: "author 1",
    url: "www.url1.world",
    likes: 1111,
  },
  {
    title: "title 2",
    author: "author 2",
    url: "www.url2.world",
    likes: 2222,
  },
];

const initialUsers = [
  {
    username: "test1",
    name: "Test Person1",
    passwordHash:
      "$2b$10$u/hnlbDd1KEnNGLKFbmGQuUq5PDUfKnshEoKvsHQlnb4mvLkDbnbi",
  },
  {
    username: "test2",
    name: "Test Person2",
    passwordHash:
      "$2b$10$u/hnlbDd1KEnNGLKFbmGQuUq5PDUfKnshEoKvsHQlnb4mvLkDbnbi",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, blogsInDb, initialUsers, usersInDb };
