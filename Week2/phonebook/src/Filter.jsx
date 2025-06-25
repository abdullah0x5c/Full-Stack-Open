const Filter = ({persons, setPersonsShown}) => {

    const filter = (event) => {
    const search = event.target.value.toLowerCase()
    if(search.length > 0) {
      const filtered = persons.filter((person) => person.name.toLowerCase().includes(search))
      setPersonsShown(filtered)
    }
    else
      setPersonsShown(persons)
  }
  
    return (
        <>
            show with filter <input onChange={filter}/>
        </>
    )
}

export default Filter