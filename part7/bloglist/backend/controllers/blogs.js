const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = request.user;

  if (!body.likes) {
    body.likes = 0;
  }
  if (!body.title || !body.url) {
    return response.status(400).json({ error: "must have title and url" });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== request.user._id.toString()) {
    response.status(401).end();
  } else {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  if (!blog.title || !blog.url || !blog.likes) {
    response.status(400).end();
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(blog);
});

module.exports = blogsRouter;
