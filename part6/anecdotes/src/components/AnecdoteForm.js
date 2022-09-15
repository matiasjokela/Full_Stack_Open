import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
	const submitAnecdote = (event) => {
		event.preventDefault()
		const anecdote = event.target.anecdote.value
		event.target.anecdote.value = ''
		props.setNotification(`anecdote '${anecdote}' added`, 5)
		props.createAnecdote(anecdote)
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

const mapDispatchToProps = {
	setNotification,
	createAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm