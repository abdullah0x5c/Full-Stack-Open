const Content = (props) => {
    return (
        <>
            <p>{props.part[0]} {props.exercises[0]}</p>
            <p>{props.part[1]} {props.exercises[1]}</p>
            <p>{props.part[2]} {props.exercises[2]}</p>
        </>
    )
}

export default Content