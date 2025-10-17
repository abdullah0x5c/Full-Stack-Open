import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  
  const getId = () => (100000 * Math.random()).toFixed(0)
  let anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = id => {
    let action = {
      type: 'VOTE',
      payload: {
        id: id
      }
    }
    dispatch(action)
  }

  const createAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    let action = {
      type: 'CREATE',
      payload: {
        content: content,
        id: getId(),
        votes: 0
      }
    }
    dispatch(action)
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
