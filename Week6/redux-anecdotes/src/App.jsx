import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  
  const getId = () => (100000 * Math.random()).toFixed(0)
  let anecdotes = useSelector(state => state)
  let sortedAnecdotes = anecdotes.sort(function(a ,b ) {return b.votes - a.votes})
  const dispatch = useDispatch()


  const vote = id => {
    return {
      type: 'VOTE',
      payload: {
        id: id
      }
  }}

  const newAnecdote = content => {
    return {
      type: 'CREATE',
      payload: {
        content: content,
        id: getId(),
        votes: 0
      }
    }
  }

  const addVote = id => {
    dispatch(vote(id))
  }

  const createAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(newAnecdote(content))
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote => (
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
