import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = newToken => {
	token = `bearer ${newToken}`
	config = {
		headers: { Authorization: token }
	}
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  let blogs = response.data.map(blog => blog)
  blogs.sort((a, b) => b.likes - a.likes)
  return blogs
}

const create = async (newBlog) => {
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const update = async (updatedBlog, id) => {
	const url = baseUrl.concat('/', id)
	const response = await axios.put(url, updatedBlog)
	return response.data
}

const remove = async (id) => {
	const url = baseUrl.concat('/', id)
	const response = await axios.delete(url, config)
	return response.data
}


export default { getAll, create, setToken, update, remove }