import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import Filter from "./Filter"
const AnecdoteList = () => {
 
    const anecdotes = useSelector(state => {
      return state.anecdotes.filter((anecdote) => 
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    })
    console.log(anecdotes)
    const sortedAnecdotes = anecdotes.sort(function(a ,b ) {return b.votes - a.votes})
    const dispatch = useDispatch()

    const addVote = id => {
    dispatch(vote({id}))
    }

    return (<>
        <Filter />
        {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>)
}

export default AnecdoteList