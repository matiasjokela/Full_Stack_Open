const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	if (!blog.likes) {
		blog.likes = 0
	}
	if (!blog.title || !blog.url) {
		response.status(400).end()
	}
	else {
		const savedBlog = await blog.save()
		response.status(201).json(savedBlog)
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const blog = request.body
	if (!blog.title || !blog.url || !blog.likes) {
		response.status(400).end()
	}
	await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(blog)
})

module.exports = blogsRouter