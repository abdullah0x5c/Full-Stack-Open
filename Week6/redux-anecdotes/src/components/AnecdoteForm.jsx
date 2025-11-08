import {useDispatch} from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, clearNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdote = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
                dispatch(newAnecdote(content))
                dispatch(newNotification("New Anecdote Added Successfully!"))
                // Clear the notification after 5 seconds by dispatching a separate action
                setTimeout(() => {
                    dispatch(clearNotification())
                }, 5000)
                // optional: clear input
                event.target.anecdote.value = ''
    }

    return(<>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
            <div>
            <input name="anecdote"/>
            </div>
            <button type="submit">create</button>
        </form>
    </>)
}

export default AnecdoteForm