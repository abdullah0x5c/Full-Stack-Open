import { useDispatch, useSelector } from "react-redux";
import {filterChange} from "./../reducers/filterReducer"

const Filter = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(filterChange(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter