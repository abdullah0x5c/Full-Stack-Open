import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '042-7845961',
      id: 1
     }
  ]) 
  const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')


  const changeName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const changeNumber = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const notExists = () => {
    const finds = persons.find((person) => person.name == newName || person.number == newNumber)
    return !finds
  }

  const submit = (event) => {
    event.preventDefault()
    if(notExists()){
      setPersons([...persons,{name: newName, number: newNumber, id:persons.length+1}])
    }
    else{
      alert(`Name or Number is already added to phonebook`)
    }
  }

  const names = persons.map((person, index) => <li key = {index} > {person.name} {person.number}</li>)

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit ={submit}>
        <div>
          name: <input onChange={changeName} value={newName}/>
        </div>
        <div>
          number: <input onChange={changeNumber} value={newNumber}/>
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