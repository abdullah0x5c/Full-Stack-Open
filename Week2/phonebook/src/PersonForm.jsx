import data from './data.jsx'

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
    const finds = persons.find((person) => person.name == newName)
    return !finds
  }

  const submit = (event) => {
    event.preventDefault()
    let person = {
      name: newName,
      number: newNumber,
    }

    if(notExists()){
      data.postObj(person)
        .then(data => {
          console.log(data)
          setPersons([...persons, data])
          setPersonsShown([...personsShown, data])
        })
        .catch(error => {
          console.log("error", error)
        })
    }
    else{
      if(window.confirm(`${person.name} is already added in the phonebook, replace the old number with the new one?`)){
        let id = persons.find(entry => entry.name == person.name).id
        console.log(id)
        data.updateObj(id, person)
          .then(data => {
            console.log(data)
            let intermediateArray = persons.filter(entry => entry.name != person.name)
            setPersons([...intermediateArray, data])
            setPersonsShown([...intermediateArray, data])
          })
          .catch(error => {
            console.log("error", error)
          })
      }
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