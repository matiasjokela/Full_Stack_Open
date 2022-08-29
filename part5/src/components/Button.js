import PropTypes from 'prop-types'

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

Button.propTypes = {
	text: PropTypes.string.isRequired
}

export default Button