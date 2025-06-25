import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const change = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const submit = (event) => {
    event.preventDefault()
    setPersons([...persons,{name: newName}])
  }

  const names = persons.map((person, index) => <li key = {index} > {person.name}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit ={submit}>
        <div>
          name: <input onChange={change} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {names}
      </ul>
    </div>
  )
}

export default App