import { useDispatch } from 'react-redux'
import { useEffect } from "react"
import {setAnecdotes} from './reducers/anecdoteReducer'
import anecdoteServices from './services/anecdotes'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const dispatch = useDispatch()

  useEffect( () => {
    anecdoteServices.getAll().then(arr => {
      dispatch(setAnecdotes(arr))
    })
  },[dispatch])


  return (
    <div>
      <h2>Anecdotes</h2>
      <br></br>
      <Notification />
      <br></br>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
