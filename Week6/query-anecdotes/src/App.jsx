import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addVote } from './services/requests.js'

const App = () => {
  const queryClient = useQueryClient()

  const { notificationDispatch } = useContext(NotificationContext)


  const anecVoteMutation =  useMutation({
      mutationFn: addVote,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['anecdotes']})
        notificationDispatch({ type: 'SET' })
        setTimeout(() => {
          notificationDispatch({ type: 'RESET' })
        }
          ,3000
        )
      }
    })
  
  const handleVote = (anecdote) => {
    anecVoteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey:['anecdotes'],
    queryFn: getAnecdotes
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote Application Completed</h3>

      <Notification />
      
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
