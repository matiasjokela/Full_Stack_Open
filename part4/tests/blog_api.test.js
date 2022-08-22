const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

const api = supertest(app)

test('blogs are returned as json', async () => {
	await api.get('/api/blogs').expect(200)
	.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id field is found', async () => {
	const response = await api.get('/api/blogs')
	const returnedBlogs = response.body
	returnedBlogs.forEach((blog) => {
		expect(blog.id).toBeDefined()
	});
})

test('blogs can be added', async () => {
	const newBlog = {
		title: 'WaitButWhy',
		author: 'Tim Urban',
		url: 'https://www.waitbutwhy.com',
		likes: '1000000'
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAfterPost = await helper.blogsInDb()
	expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)
	const authors = blogsAfterPost.map(blog => blog.author)
	expect(authors).toContain('Tim Urban')
})

test('likes field always found', async () => {
	const newBlog = {
		title: 'Trolol',
		author: 'Elon Musk',
		url: 'https://www.tesla.com'
	}
	await api.post('/api/blogs').send(newBlog)
	const allBlogs = await helper.blogsInDb()
	allBlogs.forEach((blog) => {
		expect(blog.likes).toBeDefined()
	})
})

test('title and url always found', async () => {
	const noTitleBlog = {
		author: 'Elon Musk',
		url: 'https://www.tesla.com'
	}

	const noUrlBlog = {
		title: 'Muskonomics',
		author: 'Elon Musk',
	}

	await api.post('/api/blogs').send(noTitleBlog).expect(400)
	await api.post('/api/blogs').send(noUrlBlog).expect(400)
})

test('blogs can be deleted', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToDelete = blogsAtStart[0]

	await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
	
	const blogIds = blogsAtEnd.map(blog => blog.id)
	expect(blogIds).not.toContain(blogToDelete.id)
})

test('blogs can be updated', async() => {
	const blogsAtStart = await helper.blogsInDb()
	let blogToUpdate = JSON.parse(JSON.stringify(blogsAtStart[0]))
	
	blogToUpdate.likes += 1
	await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
	
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtStart[0].author).toBe(blogsAtEnd[0].author)
	expect(blogsAtStart[0].likes + 1).toBe(blogsAtEnd[0].likes)

})

afterAll(() => {
	mongoose.connection.close()
})

