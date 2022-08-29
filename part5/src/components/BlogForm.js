import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleAdding = async (event) => {
		event.preventDefault()
		console.log('title', title)
		createBlog({
			title: title,
			author: author,
			url: url
		})
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={handleAdding}>
				<div>
					title
					<input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
				</div>
				<div>
					author
					<input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/>
				</div>
				<div>
					url
					<input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)}/>
				</div>
				<button type="submit">create</button>
			</form>
		</>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
}

export default BlogForm