import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

const setAnecdotes = (anecdotes) => {
	const allAnecdotes = asObject(anecdotes)
	return {
		type: 'SET_ANECDOTES',
		data: { allAnecdotes }
	}
}

const addAnecdote = (newAnecdote) => {
	return {
		type: 'NEW_ANECDOTE',
		data: { newAnecdote }
	}
}

const addVote = (id) => {
	return {
		type: 'VOTE',
		data: { id }
	}
}

const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const originalAnecdote = asObject(anecdote)
		const updatedAnecdote = {
			content: anecdote.content,
			votes: anecdote.votes + 1
		}
		await anecdoteService.update(updatedAnecdote, anecdote.id)
		dispatch(addVote(anecdote.id))
	}
}

const createAnecdote = (anecdote) => {
	return async (dispatch) => {
		const newAnecdote = asObject(anecdote)
		await anecdoteService.addNew(newAnecdote)
		dispatch(addAnecdote(newAnecdote))
	}
}

const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}


const initialState = []

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'NEW_ANECDOTE':
			return state.concat(action.data.newAnecdote)
		case 'VOTE':
			const id = action.data.id
			const ad = state.find((anecdote) => anecdote.id === id)
			const updatedAnecdote = {
				...ad,
				votes: ad.votes + 1
			}
			return state.map((anecdote) => 
				anecdote.id === id ? updatedAnecdote : anecdote
			)
		case 'SET_ANECDOTES':
			return (action.data.allAnecdotes.content)
		default:
			return state
	}
}

export { initializeAnecdotes, createAnecdote, voteAnecdote }

export default reducer