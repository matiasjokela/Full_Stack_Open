import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
	const handleChange = (event) => {
		const filter = event.target.value
		if (filter === '') {
			props.setFilter(null)
		} else {
			props.setFilter(filter)
		}
	}

	const vote = (anecdote) => {
		props.setNotification(`you voted '${anecdote.content}'`, 5)
		props.voteAnecdote(anecdote)
	}

	let sortedAnecdotes
	if (props.filter) {
		sortedAnecdotes = props.anecdotes.filter(anecdote => anecdote.content.includes(props.filter))
	} else {
		sortedAnecdotes = props.anecdotes.map(a => a)
	}
	
	sortedAnecdotes.sort((a, b) => b.votes - a.votes)

	const style = {
		marginBottom: 10
	}
	return (
		<div style={style}>
			filter <input onChange={handleChange} />
			{sortedAnecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		filter: state.filter,
		anecdotes: state.anecdotes
	}
}

const mapDispatchToProps = {
	setFilter,
	setNotification,
	voteAnecdote
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter