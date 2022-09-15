import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const submitAnecdote = (event) => {
		event.preventDefault()
		const anecdote = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(setNotification(`anecdote '${anecdote}' added`, 5))
		dispatch(createAnecdote(anecdote))
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