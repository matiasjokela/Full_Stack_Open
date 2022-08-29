import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, style }) => {
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
	const [message, setMessage] = useState(null)
	const [style, setStyle] = useState('')

	const addBlogRef = useRef()

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
			setMessage('wrong username or password')
			setTimeout(() => {
				setMessage(null)
				setStyle('')
			}, 3000)
		}
	}

	const deleteBlog = async (id) => {
		const returnedBlog = await blogService.remove(id)
		console.log(returnedBlog)
		const allBlogs = await blogService.getAll()
		setBlogs(allBlogs)
	}

	const likeBlog = async (blogObject, id) => {
		const returnedBlog = await blogService.update(blogObject, id)
		console.log(returnedBlog)
		const allBlogs = await blogService.getAll()
		setBlogs(allBlogs)
	}

	const addBlog = async (blogObject) => {
		addBlogRef.current.toggleVisibility()
		try {
			const returnedBlog = await blogService.create(blogObject)
			console.log(returnedBlog)
			const allBlogs = await blogService.getAll()
			setBlogs(allBlogs)
			setStyle('success')
			setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
			setTimeout(() => {
				setMessage(null)
				setStyle('')
			}, 3000)
		} catch (exception) {
			setStyle('error')
			setMessage('blog not added, provide values for all fields')
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

	const blogForm = () => (
		<Togglable buttonLabel='new blog' ref={addBlogRef}>
			<BlogForm createBlog={addBlog}/>
		</Togglable>
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
			{blogForm()}
			{blogs.map(blog => {
				return <Blog key={blog.id} blog={blog} likeBlog={likeBlog}
					loggedUser={user} removeBlog={deleteBlog}/>
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
