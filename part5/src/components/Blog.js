import { useState } from "react"

const Blog = ({blog}) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	console.log('blog', blog)
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
			<div>
				{blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
					<div>{blog.url}</div>
					<div>likes {blog.likes} <button>like</button></div>
					<div>{blog.user.name}</div>
			</div>
		</div>
	)
}

export default Blog