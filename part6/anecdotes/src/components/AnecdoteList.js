import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()



	const vote = (id) => {
		dispatch(addVote(id))
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
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
		</>
	)
}

export default AnecdoteList