const Total = ({parts}) => {


    const totalExercises = parts.reduce((sum, value) => sum + value.exercises, 0);

    return (
        <>
            <b>
                <p>
                    Number of exercises {totalExercises}
                </p>
            </b>    
        </>
    )
}

export default Total