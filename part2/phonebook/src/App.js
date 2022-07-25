import { useState } from 'react'

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
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newSearch, setNewSearch] = useState('')

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
    console.log("value", event.target.value)
    event.preventDefault()
    const namearr = persons.map(person => person.name)
    if(namearr.includes(newName)){
      alert(`${newName} already exisits in phonebook`)
    }else{
      console.log('button clicked', newName)
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(newPerson))
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