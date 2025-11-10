import { addAnecdote } from '../services/requests.js'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'


const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const { notificationDispatch } = useContext(NotificationContext)

  const newAnecMutation =  useMutation({
    mutationFn: addAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      // show notification via context
      notificationDispatch({ type: 'SET' })
      // clear after 3 seconds
      setTimeout(() => notificationDispatch({ type: 'RESET' }), 3000)
    },
    onError: (error) => {
    notificationDispatch({ type: 'ERROR' })
    setTimeout(() => notificationDispatch({ type: 'RESET' }), 3000)
  },


  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate(content)
  }



  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
