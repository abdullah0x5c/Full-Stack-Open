import Part from './Part'

const Content = (props) => {
    return (
        <>
            <Part part={props.part[0]} exercise={props.exercises[0]} />
            <Part part={props.part[1]} exercise={props.exercises[1]} />
            <Part part={props.part[2]} exercise={props.exercises[2]} />
        </>
    )
}

export default Content