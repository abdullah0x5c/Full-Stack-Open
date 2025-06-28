import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './Person.jsx'
import Filter from './Filter.jsx'
import PersonForm from './PersonForm.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [personsShown, setPersonsShown] = useState([]) 

  const data = async () =>   axios
    .get("http://127.0.0.1:3001/persons")
    .then(response =>{
      setPersons(response.data)
      setPersonsShown(response.data)
    })

  useEffect(() => {
    data()
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