import React, { useState, useEffect } from 'react'
import personService from './services/personService'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const found = persons.find(person => person.name === newName)

    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService.update(found.id, {...found, number: newNumber}).then(response => {
          setPersons(persons.map(p => p.id !== found.id ? p : response))
          setNewName('')
          setNewNumber('')
          showNotification(`${found.name} was updated successfully`, 'success')
        })
        .catch(error => {
          console.log(error)
          setPersons(persons.filter(p => p.id !== found.id))
          setNewName('')
          setNewNumber('')
          showNotification(`${found.name} has already been deleted!`, 'error')
        })
      }
    } else {
      const addable = {
        name: newName,
        number: newNumber,
      }
      personService.create(addable).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        showNotification(`${addable.name} was added successfully`, 'success')
      }).catch(error => {
        showNotification(error.response.data)
      })
    }
  }

  const removePerson = (person) => (
    () => {
      if(window.confirm(`Delete ${person.name}?`)){
        personService.remove(person.id).then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
          showNotification(`${person.name} was removed successfully`, 'success')
        })
        .catch(error => {
          console.log(error)
          setPersons(persons.filter(p => p.id !== person.id))
          showNotification(`${person.name} has already been deleted!`, 'error')
        })
      }
    }
  )

  const showNotification = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      {notification !== null ? <Notification message={notification.message} type={notification.type} /> : ''}
      <Search value={search} handleChange={handleSearchChange} />
      <NewPersonForm addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <List persons={persons} search={search} remove={removePerson} />
    </div>
  )
}

const Search = ({ value, handleChange }) => {
  return (
    <>
      <h2>Filter shown with: </h2>
      <form>
        <input value={value} onChange={handleChange}></input>
      </form>
    </>
  )
}

const NewPersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          name: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const List = ({ persons, search, remove }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .map(p => <Person key={p.id} person={p} remove={remove(p)}/>)}
    </>
  )
}

const Person = ({person, remove}) => {
  
  return (
    <div>
      <span>{person.name}: {person.number}</span>
      <button onClick={remove}>Remove</button>
    </div>
  )
}

const Notification = ({ message, type }) => {
  const successStyle = {
    width: "80vw",
    fontSize: 20,
    backgroundColor: "lightgray",
    color: "green",
    border: "2px solid green",
    padding: 5
  }

  const errorStyle = {
    width: "80vw",
    fontSize: 20,
    backgroundColor: "lightgray",
    color: "red",
    border: "2px solid red",
    padding: 5
  }

  return (
    <div style={type === 'success' ? successStyle : errorStyle}>
      {message}
    </div>
  )
}

export default App
