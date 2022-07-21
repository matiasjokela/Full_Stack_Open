const Course = ({course}) => {
	return (
		<>
			<Header course={course}/>
			<Content course={course}/>
		</>
	)
}

const Header = ({course}) => {
	return (
		<div>
			<h2>{course.name}</h2>
		</div>
	)
}

const Part = ({part}) => {
	return (
		<div>
			<p>{part.name} {part.exercises}</p>
		</div>
	)
}

const Total = ({course}) => {
	return (
		<div>
			<p>total of {course.parts.reduce((sum, part) => 
				sum + part.exercises, 0)} exercises</p>
		</div>
	)
}

const Content = ({course}) => {
	return (
		<>
			{course.parts.map(part => 
				<Part key={part.id} part={part}/>
			)}
			<Total course={course}/>
		</>
	)
}

export default Course