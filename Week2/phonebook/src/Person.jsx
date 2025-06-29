const Person = ({persons, deleteEntree}) => {

    const names = persons.map((person, index) => 
    <li key = {index} >
        {person.name} {person.number} 
        <button onClick = {() => deleteEntree(person.id, person.name)} >
            delete
        </button>
    </li>
    )

  
    return (
        <>
            <ul>
                {names}
            </ul>
        </>
    )
}

export default Person