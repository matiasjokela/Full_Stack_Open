import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const addNew = async (anecdote) => {
	const response = await axios.post(baseUrl, anecdote)
	return response.data
}

const update = async (updatedAnecdote, id) => {
	const url = baseUrl.concat('/', id)
	const response = await axios.put(url, updatedAnecdote)
	return response.data
}

export default { getAll, addNew, update }