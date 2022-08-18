const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => {
		return sum + blog.likes
	}, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return 0
	}
	let favorite = JSON.parse(JSON.stringify(blogs[0]))
	blogs.forEach((blog) => {
		if (blog.likes > favorite.likes)
			favorite = JSON.parse(JSON.stringify(blog))
	})
	return favorite
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return 0
	}
	const authors = [... new Set(blogs.map(blog => blog.author))]
	const blogCounts = authors.map((author) => {
		return {
			author: JSON.parse(JSON.stringify(author)),
			blogs: blogs.filter(e => e.author === author).length
		}
	})
	let most = JSON.parse(JSON.stringify(blogCounts[0]))
	blogCounts.forEach((author) => {
		if (author.blogs > most.blogs)
			most = JSON.parse(JSON.stringify(author))
	})
	return most

}

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0
	}
	const authors = [... new Set(blogs.map(blog => blog.author))]
	const likeCounts = authors.map((author) => {
		const blogsForAuthor = blogs.filter(e => e.author === author)
		const likes = blogsForAuthor.reduce((sum, blog) => {
			return sum + blog.likes
		}, 0)
		return {
			author: JSON.parse(JSON.stringify(author)),
			likes: likes
		}
	})
	let most = JSON.parse(JSON.stringify(likeCounts[0]))
	likeCounts.forEach((author) => {
		if (author.likes > most.likes)
			most = JSON.parse(JSON.stringify(author))
	})
	return most
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}