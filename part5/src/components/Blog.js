import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, likeBlog, loggedUser, removeBlog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	const [allInfo, setAllInfo] = useState(false)
	const [buttonLabel, setButtonLabel] = useState('view')

	//const hideWhenVisible = { display: allInfo ? 'none' : '' }
	const showWhenVisible = { display: allInfo ? '' : 'none' }

	const toggleVisibility = () => {
		setAllInfo(!allInfo)
		if (allInfo) {
			setButtonLabel('view')
		} else {
			setButtonLabel('hide')
		}
	}

	return (
		<div style={blogStyle}>
			<div id='titleAndAuthor'>
				{blog.title} {blog.author} <Button handleClick={toggleVisibility} text={buttonLabel}/>
			</div>
			<div style={showWhenVisible} id='additionalInfo'>
				<div>{blog.url}</div>
				<div>likes {blog.likes} <Button handleClick={() => {
					likeBlog(({
						user: blog.user.id,
						likes: blog.likes + 1,
						author: blog.author,
						title: blog.title,
						url: blog.url
					}), blog.id)
				}} text="like"/></div>
				<div>{blog.user.name}</div>
				{loggedUser.username === blog.user.username &&
					<Button text='remove' handleClick={() => {
						if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
							removeBlog(blog.id)
						}
					}}/>
				}
			</div>
		</div>
	)
}

export default Blog