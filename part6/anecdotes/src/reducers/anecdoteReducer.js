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

const addAnecdote = (anecdote) => {
	const newAnecdote = asObject(anecdote)
	anecdoteService.addNew(newAnecdote).then(anecdotes => console.log(anecdotes))
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

export { addVote, addAnecdote, setAnecdotes }

export default reducer