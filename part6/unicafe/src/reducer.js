const initialState = {
	good: 0,
	ok: 0,
	bad: 0
}

let newState

const counterReducer = (state = initialState, action) => {
	console.log(action)
	switch (action.type) {
		case 'GOOD':
		newState = JSON.parse(JSON.stringify(state))
		newState.good += 1
		return newState
	case 'OK':
		newState = JSON.parse(JSON.stringify(state))
		newState.ok += 1
		return newState
	case 'BAD':
		newState = JSON.parse(JSON.stringify(state))
		newState.bad += 1
		return newState
	case 'ZERO':
		newState = JSON.parse(JSON.stringify(initialState))
		return newState
	default: return state
}

}

export default counterReducer