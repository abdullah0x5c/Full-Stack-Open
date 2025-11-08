import { useSelector, useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'


const App = () => {
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
