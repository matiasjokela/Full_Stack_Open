import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Notification = ({ message, style }) => {
	console.log('style', {style})
	return (
		<div className={style}>
			{message}
		</div>
	)
}

const Person = ({ person, deletePerson }) => {
	return (
			<li>
				{person.name} {person.number}<button onClick={() => deletePerson(person.name, person.id)}>delete</button>
			</li>
	)
}

const People = ({ persons , filter, deletePerson}) => {
	const filteredPersons = persons.filter(person => person.name.includes(filter))
	return (
		<ul>
			{filteredPersons.map(person => 
				<Person key={person.name} person={person} deletePerson={deletePerson}/>
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
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState('')

  useEffect(() => {
	personsService.getAll().then(allPersons => {
		setPersons(allPersons)
	})
  }, [])

  const addPerson = (event) => {
	event.preventDefault()
	const personObject = {
		name: newName,
		number: newNumber
	}
	const names = persons.map(person => person.name)
	if (names.includes(newName)) {
		if (window.confirm(`${newName} is already added to the phonebook, replace to old number with the new?`))
		{
			const person = persons.find(person => person.name === newName)
			personsService.update(person.id, personObject).then(returnedPerson => {
				setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
				setNewName('')
				setNewNumber('')
				setMessage(`${newName} updated`)
				setStyle('success')
				setTimeout(() => {
					setMessage(null)
					setStyle('')
				}, 5000)
			})
		}
		else {
			setNewName('')
			setNewNumber('')
		}
	}
	else {
		personsService.create(personObject).then(returnedPerson => {
			setPersons(persons.concat(returnedPerson))
			setNewName('')
			setNewNumber('')
			setMessage(`${newName} added`)
			setStyle('success')
			setTimeout(() => {
				setMessage(null)
				setStyle('')
			}, 5000)
		})

	}
  }


const deletePerson = (name, id) => {
	if (window.confirm(`Delete ${name}`))
	{
		personsService.deletePerson(id).then(() => {
			setPersons(persons.filter(n => n.id !== id))
			setMessage(`${name} deleted`)
			setStyle('success')
			setTimeout(() => {
				setMessage(null)
				setStyle('')
			}, 5000)
		}).catch(error => {
			setMessage(`Information of ${name} has been removed from server`)
			setPersons(persons.filter(n => n.id !== id))
			setStyle('error')
			setTimeout(() => {
				setMessage(null)
				setStyle('')
			}, 5000)
		})
	}

//   const deletePerson = (name, id) => {
// 	if (window.confirm(`Delete ${name}`))
// 	{
// 		personsService.deletePerson(id)
// 		setPersons(persons.filter(n => n.id !== id))
// 		setMessage(`${name} deleted`)
// 		setStyle('success')
// 		setTimeout(() => {
// 			setMessage(null)
// 			setStyle('')
// 		}, 5000)
// 	}


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
	  <Notification message={message} style={style}/>
	  <Filter filter={filter} handleFilterChange={handleFilterChange}/>
	  <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
		<div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      <People persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App