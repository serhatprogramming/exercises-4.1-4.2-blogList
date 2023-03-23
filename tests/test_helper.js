const Blog = require("../models/blog");

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
