import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './service/persons'

const Filter = ({newSearch, handleSearch}) => {
  return(
    <div>
      Filter shown with <input value={newSearch} onChange={handleSearch}></input>
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNewChange, newNumber, handleNumberChange })=>{
  return(
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNewChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({personsToShow}) =>{
  return(
    personsToShow.map(person =>
      <p key={person.name}>{person.name} {person.number}</p>  
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newSearch, setNewSearch] = useState('')
  const baseURL = "http://localhost:3001/persons"

  useEffect(() => {
    console.log("servive: ", personService)
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  console.log(persons)

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  const handleSearch = (event)=> {
    setNewSearch(event.target.value)
    setShowAll(false)
  }

  const handleNewChange = (event) => {
    console.log("event target: ",event.target)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    const namearr = persons.map(person => person.name)
    if(namearr.includes(newName)){
      alert(`${newName} already exisits in phonebook`)
    }else{
      console.log('button clicked', newName)
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService
      .create(newPerson)
      .then(response =>{
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch}/>
      <h1>Add a new</h1>
      <PersonForm 
      addPerson = {addPerson}
      newName = {newName}
      handleNewChange = {handleNewChange}
      newNumber = {newNumber}
      handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App