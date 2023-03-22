const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const { title, author, likes } = blogs.reduce((prev, cur) =>
    prev.likes > cur.likes ? prev : cur
  );

  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  const bloggers = new Map();

  blogs.map((blog) => {
    bloggers.has(blog.author)
      ? bloggers.set(blog.author, bloggers.get(blog.author) + 1)
      : bloggers.set(blog.author, 1);
  });

  const mostBlogger = [...bloggers.entries()].reduce((prev, next) =>
    prev[1] > next[1] ? prev : next
  );

  return { author: mostBlogger[0], blogs: mostBlogger[1] };
};

const mostLikes = (blogs) => {
  const bloggers = new Map();

  blogs.map((blog) => {
    bloggers.has(blog.author)
      ? bloggers.set(blog.author, bloggers.get(blog.author) + blog.likes)
      : bloggers.set(blog.author, blog.likes);
  });

  const mostBlogger = [...bloggers.entries()].reduce((prev, next) =>
    prev[1] > next[1] ? prev : next
  );

  return { author: mostBlogger[0], likes: mostBlogger[1] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
