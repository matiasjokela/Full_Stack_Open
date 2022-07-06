import { useState } from 'react'

const Button = (props) => (
	<button onClick={props.handleClick}>
		{props.text}
	</button>
)

const StatisticsLine = (props) => (
	<tbody>
		<tr>
			<td>{props.text} </td>
			<td>{props.value} {props.sign}</td>
		</tr>
	</tbody>
)

const Statistics = (props) => {
	const all = props.good + props.neutral + props.bad
	const average = (props.good - props.bad) / all

	if (all === 0)
		return (<div>No feedback given</div>)
	return (
		<table>
			<StatisticsLine text='good' value={props.good} />
			<StatisticsLine text='neutral' value={props.neutral} />
			<StatisticsLine text='bad' value={props.bad} />
			<StatisticsLine text='all' value={all} />
			<StatisticsLine text='average' value={average} />
			<StatisticsLine text='positive' value={100 * props.good / all} sign='%'/>
		</table>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<>
			<h1>Give feedbak</h1>
			<Button handleClick={() => setGood(good + 1)} text='good'/>
			<Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
			<Button handleClick={() => setBad(bad + 1)} text='bad'/>
			<h1>Statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	)
}

export default App;
