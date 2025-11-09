import {useDispatch} from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import anecdoteServices from "../services/anecdotes.js"
import { newNotification, clearNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdote = async event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        const anecdote = await anecdoteServices.addAnecdote(content)
        dispatch(newAnecdote(anecdote))
        dispatch(newNotification("New Anecdote Added Successfully!"))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
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