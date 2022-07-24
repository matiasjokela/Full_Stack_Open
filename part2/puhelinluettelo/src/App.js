import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
	return (
		<li>{person.name} {person.number}</li>
	)
}

const People = ({ persons , filter}) => {
	const filteredPersons = persons.filter(person => person.name.includes(filter))
	return (
		<ul>
			{filteredPersons.map(person => 
				<Person key={person.name} person={person}/>
			)}
		</ul>
	)
}

const Filter = ({ filter, handleFilterChange }) => {
	return (
		<div> 
		filter shown with: <input value={filter} onChange={handleFilterChange}/>
		</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
	axios.get('http://localhost:3001/persons').then((response) => {
		setPersons(response.data)
	})
  }, [])

  const addPerson = (event) => {
	event.preventDefault()
	const personObject = {
		name: newName,
		number: newNumber
	}
	persons.findIndex(person => person.name === newName) > -1 ? 
		window.alert(`${newName} is already added to phonebook`) : 
		setPersons(persons.concat(personObject))
	setNewName('')
	setNewNumber('')
  }

  const handleNameChange = (event) => {
	setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
	setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
	setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
	  <Filter filter={filter} handleFilterChange={handleFilterChange}/>
	  <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
		<div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      <People persons={persons} filter={filter}/>
    </div>
  )
}

export default App