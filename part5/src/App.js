import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, style }) => {
	console.log('style', {style})
	return (
		<div className={style}>
			{message}
		</div>
	)
}

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [message, setMessage] = useState(null)
	const [style, setStyle] = useState('')

	useEffect(() => {
		blogService.getAll().then(blogs =>
		setBlogs( blogs ))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})
			console.log(user)
			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			console.log('logged in as', user)
		} catch (exception) {
			console.log(exception)
			setUser(null)
			setUsername('')
			setPassword('')
			setStyle('error')
			setMessage("wrong username or password")
			setTimeout(() => {
				setMessage(null)
				setStyle('')
			}, 3000)
		}
	}

	const handleAdding = async (event) => {
		event.preventDefault()
		try {
			const blog = {
				title: title,
				author: author,
				url: url
			}
			const returnedBlog = await blogService.create(blog)
			setBlogs(blogs.concat(returnedBlog))
			setTitle('')
			setAuthor('')
			setUrl('')
			setStyle('success')
			setMessage(`a new blog ${title} by ${author} added`)
			setTimeout(() => {
				setMessage(null)
				setStyle('')
			}, 3000)
		} catch (exception) {
			console.log('e', exception)
			setTitle('')
			setAuthor('')
			setUrl('')
			setStyle('error')
			setMessage("blog not added, provide values for all fields")
			setTimeout(() => {
				setMessage(null)
				setStyle('')
			}, 5000)
		}
	}

	const loginForm = () => (
		<>
			<h2>log in to application</h2>
			<Notification message={message} style={style}/>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
				</div>
				<div>
					password
					<input type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	)

	const addBlogs = () => (
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

	const loggedInView = () => (
		<div>
			<h2>blogs</h2>
			<Notification message={message} style={style}/>
			<p>
				{user.name} logged in 
				<button onClick={() => {
					window.localStorage.removeItem('loggedBlogAppUser')
					setUser(null)
				}}>logout</button>
			</p>
			{addBlogs()}
			{blogs.map(blog => {
				console.log(blog);
				return <Blog key={blog.id} blog={blog}/>
			})}
		</div>
	)

	return (
		<>
			{user === null ? loginForm() : loggedInView()}
		</>
	)
}

export default App
