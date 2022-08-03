import { useState, useEffect } from 'react'
import personService from './service/persons'
import './main.css'

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
const Notificaiton = ({message}) =>{
  if (message === null) {
    return null
  }
      return (
        <div className='success'>
        {message}
      </div>
      )

}

const Persons = ({personsToShow, setPersons}) =>{
  // confimation for deletion and get the latest phonebook infos after the deletion
  const deleteClicked = (e) =>{
    if(window.confirm('Do you really want to delete it?')){
      personService
      .deletePerson(e.target.id)
      .then(response =>{
        console.log(response)
        return personService.getAll()
      })
      .then(response =>{
        setPersons(response.data)
      })
    }
  }
  return(
    personsToShow.map(person =>
          <p key={person.id}>{person.name} {person.number}  
          <Button id={person.id} deleteClicked={deleteClicked}/>
          </p>
    )
  )
}

const Button = ({id, deleteClicked}) => <button id={id} onClick={deleteClicked}>delete</button>

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newSearch, setNewSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
 

  // get all phonebook info from a server
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
    const updateOldInfo = (persons, personService) =>{
      let originalPerson = persons.filter(person => person.name === newName)[0]
      originalPerson.name = newName
      originalPerson.number = newNumber
      personService
      .update(originalPerson.id, originalPerson)
      .then(response =>{
        console.log(response)
        return personService.getAll()
      })
      .then(response =>{
        setPersons(response.data)
 
      })
    }
    event.preventDefault()
    // retrieve only names from Person objects and make a new array
    const namearr = persons.map(person => person.name)
    // check if a name is already in the phonebook and if it exists, proceed to the next
    if(namearr.includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        updateOldInfo(persons, personService)
        
      }
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
        setSuccessMessage(`added ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notificaiton message={successMessage}/>
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
      <Persons personsToShow={personsToShow} setPersons={setPersons}/> 
      
    </div>
  )
}

export default App