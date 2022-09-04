import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const submitAnecdote = (event) => {
		event.preventDefault()
		const anecdote = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(addAnecdote(anecdote))
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={submitAnecdote}>
				<div><input name="anecdote"/></div>
				<button type="submit">create</button>
			</form>
		</>
	)
}

export default AnecdoteForm