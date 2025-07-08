import { useState, useEffect } from 'react'
import Person from './Person.jsx'
import Filter from './Filter.jsx'
import PersonForm from './PersonForm.jsx'
import Notification from './Notification.jsx'
import data from './data.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [notification, setNotification] = useState(null)
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

  const deleteEntree = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      data.delObj(id)
        .then(data => {
          setPersons(persons.filter((person) => person.id != data.id))
          setPersonsShown(persons.filter((person) => person.id != data.id))
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
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
        setNotification = {setNotification}
      />  
      <h2>Numbers</h2>
      <Person persons={personsShown} deleteEntree={deleteEntree}/>
    </div>
  )
}

export default App