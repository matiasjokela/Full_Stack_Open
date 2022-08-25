const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
	const testUser = {
		username: 'tester',
		name: 'Marvin',
		password: 'password'
	}
	await api.post('/api/users').send(testUser)
	const login = await api.post('/api/login').send(testUser)
	const token = login.body.token
	headers = {
		'Authorization': `bearer ${token}`
	}
	await Blog.deleteMany({})
	for (let blog of helper.initialBlogs) {
		await api.post('/api/blogs').set(headers).send(blog)
	}
	//await Blog.insertMany(helper.initialBlogs)
})

// const api = supertest(app)

test('blogs are returned as json', async () => {
	await api.get('/api/blogs').set(headers).expect(200)
	.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs').set(headers)
	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id field is found', async () => {
	const response = await api.get('/api/blogs').set(headers)
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
		.set(headers)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAfterPost = await helper.blogsInDb()
	expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)
	const authors = blogsAfterPost.map(blog => blog.author)
	expect(authors).toContain('Tim Urban')
})

test('401 returned if no token', async () => {
	const newBlog = {
		title: 'WaitButWhy',
		author: 'Tim Urban',
		url: 'https://www.waitbutwhy.com',
		likes: '1000000'
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(401)

	const blogsAfterPost = await helper.blogsInDb()
	expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
})

test('likes field always found', async () => {
	const newBlog = {
		title: 'Trolol',
		author: 'Elon Musk',
		url: 'https://www.tesla.com'
	}
	await api.post('/api/blogs').set(headers).send(newBlog)
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

	await api.post('/api/blogs').set(headers).send(noTitleBlog).expect(400)
	await api.post('/api/blogs').set(headers).send(noUrlBlog).expect(400)
})

test('blogs can be deleted', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToDelete = blogsAtStart[0]

	await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(204)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
	
	const blogIds = blogsAtEnd.map(blog => blog.id)
	expect(blogIds).not.toContain(blogToDelete.id)
})

test('blogs can be updated', async() => {
	const blogsAtStart = await helper.blogsInDb()
	let blogToUpdate = JSON.parse(JSON.stringify(blogsAtStart[0]))
	
	blogToUpdate.likes += 1
	await api.put(`/api/blogs/${blogToUpdate.id}`).set(headers).send(blogToUpdate)
	
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtStart[0].author).toBe(blogsAtEnd[0].author)
	expect(blogsAtStart[0].likes + 1).toBe(blogsAtEnd[0].likes)

})



afterAll(() => {
	mongoose.connection.close()
})

