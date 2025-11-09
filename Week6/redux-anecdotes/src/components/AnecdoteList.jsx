import { useDispatch, useSelector } from "react-redux";
import { addNewVote } from "../reducers/anecdoteReducer";
import Filter from "./Filter"
const AnecdoteList = () => {
 
    const filter = useSelector(state => state.filter) || ''

    const anecdotes = useSelector(state => {
      return state.anecdotes.filter((anecdote) => 
        anecdote?.content?.toLowerCase().includes(filter.toLowerCase())
      )
    })
    console.log(anecdotes)
    const sortedAnecdotes = anecdotes.sort(function(a ,b ) {return b.votes - a.votes})
    const dispatch = useDispatch()

    const addVote = id => {
    dispatch(addNewVote(id))
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