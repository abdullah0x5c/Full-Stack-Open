import Part from './Part'

const Content = (props) => {
    const display = props.parts.map((part) => <Part key={part.id} part={part.name} exercise={part.exercises} />)
    return (
        <>
            {display}
        </>
    )
}

export default Content