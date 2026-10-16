import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [messageType, setMessageType] = useState('')
  const [message, setMessage] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      const person = persons.find(n => n.name === newName)
      const changedPerson = { ...person, number: newNumber }

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== person.id))
        })
        setMessageType('success')
        setMessage(
          `Updated ${newName}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    setMessageType('success')
    setMessage(
      `Added ${newName}`
    )
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const eliminatePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person ? person.name : 'this person'}?`)) {
      personService
        .eliminate(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`Information of ${person.name} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== id))
        })
      setMessageType('alert')
      setMessage(
        `Deleted ${person.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageType={messageType} message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} eliminatePerson={eliminatePerson} />
    </div>
  )
}

export default App