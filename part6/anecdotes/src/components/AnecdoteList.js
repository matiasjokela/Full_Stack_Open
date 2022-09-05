import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const dispatch = useDispatch()



	const vote = (anecdote) => {
		//console.log(anecdote)
		dispatch(showNotification(`you voted '${anecdote.content}'`))
		dispatch(addVote(anecdote.id))
	}

	let sortedAnecdotes = anecdotes.map(a => a)
	sortedAnecdotes.sort((a, b) => b.votes - a.votes)
	return (
		<>
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
		</>
	)
}

export default AnecdoteList