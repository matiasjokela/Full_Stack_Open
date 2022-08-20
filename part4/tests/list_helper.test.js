const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('totalLikes', () => {


	test('of empty list is zero', () => {
		expect(listHelper.totalLikes([])).toBe(0)
	})
	test('of list of one blog is the same as the likes on that blog', () => {
		expect(listHelper.totalLikes(helper.listWithOneBlog)).toBe(5)
	})
	test('of a bigger list is correct', () => {
		expect(listHelper.totalLikes(helper.initialBlogs)).toBe(36)
	})
})

describe('favoriteBlog', () => {
	test('of empty list is zero', () => {
		expect(listHelper.favoriteBlog([])).toBe(0)
	})
	test('of list of one blog is the same as that blog', () => {
		expect(listHelper.favoriteBlog(helper.listWithOneBlog)).toEqual(helper.listWithOneBlog[0])
	})
	test('of a bigger list is correct', () => {
		expect(listHelper.favoriteBlog(helper.initialBlogs)).toEqual(helper.initialBlogs[2])
	})
})

describe('mostBlogs', () => {
	test('of empty list is zero', () => {
		expect(listHelper.mostBlogs([])).toBe(0)
	})
	test('of list of one blog is the same as that blog', () => {
		expect(listHelper.mostBlogs(helper.listWithOneBlog)).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 1
		})
	})
	test('of a bigger list is correct', () => {
		expect(listHelper.mostBlogs(helper.initialBlogs)).toEqual({
			author: 'Robert C. Martin',
			blogs: 3
		})
	})
})

describe('mostLikes', () => {
	test('of empty list is zero', () => {
		expect(listHelper.mostLikes([])).toBe(0)
	})
	test('of list of one blog is the same as that blog', () => {
		expect(listHelper.mostLikes(helper.listWithOneBlog)).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 5
		})
	})
	test('of a bigger list is correct', () => {
		expect(listHelper.mostLikes(helper.initialBlogs)).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		})
	})
})