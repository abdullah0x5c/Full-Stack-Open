import axios from 'axios'

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, personsShown, setPersonsShown}) => {
  
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
    let person = {
      name: newName,
      number: newNumber,
    }
    if(notExists()){
      axios.post("http://127.0.0.1:3001/persons", person)
        .then(response => {
          console.log(response)
          setPersons([...persons,response.data])
          setPersonsShown([...personsShown, response.data])
        })
        .catch(error => {
          console.log("error", error)
        })
    }
    else{
      alert(`Name or Number is already added to phonebook`)
    }
  }
  
  return (
    <>
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
    </>
  )
}

export default PersonForm