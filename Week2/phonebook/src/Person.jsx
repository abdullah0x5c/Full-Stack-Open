const Person = ({persons}) => {

    const names = persons.map((person, index) => <li key = {index} > {person.name} {person.number}</li>)

  
    return (
        <>
            <ul>
                {names}
            </ul>
        </>
    )
}

export default Person