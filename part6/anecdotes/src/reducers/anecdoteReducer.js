const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

const addAnecdote = (anecdote) => {
	const newAnecdote = asObject(anecdote)
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


const initialState = anecdotesAtStart.map(asObject)

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
		default:
			return state



	}

}

export { addVote, addAnecdote }

export default reducer