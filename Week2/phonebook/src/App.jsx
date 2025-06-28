import { useState, useEffect } from 'react'
import Person from './Person.jsx'
import Filter from './Filter.jsx'
import PersonForm from './PersonForm.jsx'
import data from './data.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [personsShown, setPersonsShown] = useState([]) 

  useEffect(() => {
    data
      .showAll()
      .then(data =>{
        setPersons(data)
        setPersonsShown(data)
      })
  },[])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        persons={persons}
        setPersonsShown={setPersonsShown}
      />
      <h2>Add a new</h2>
      <PersonForm 
        newName = {newName} 
        setNewName = {setNewName}
        newNumber = {newNumber}
        setNewNumber = {setNewNumber}
        persons = {persons}
        setPersons = {setPersons}
        personsShown = {personsShown}
        setPersonsShown = {setPersonsShown}
      />  
      <h2>Numbers</h2>
      <Person persons={personsShown}/>
    </div>
  )
}

export default App