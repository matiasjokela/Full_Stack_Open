import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
	const filter = useSelector(state => state.filter)
	const anecdotes = useSelector(state => state.anecdotes)
	const dispatch = useDispatch()


	const handleChange = (event) => {
		const filter = event.target.value
		if (filter === '') {
			dispatch(setFilter(null))
		} else {
			dispatch(setFilter(filter))
		}
	}

	const vote = (anecdote) => {
		dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
		dispatch(voteAnecdote(anecdote))
	}

	let sortedAnecdotes
	if (filter) {
		sortedAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
	} else {
		sortedAnecdotes = anecdotes.map(a => a)
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

export default Filter