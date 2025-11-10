import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return 'New Anecdote Added Successfully!'
    case 'ERROR':
      return 'Encountered Error!'
    case 'RESET':
      return ''
    default:
      return state
  }
}

const notificationContext = createContext()

// Provider component must be capitalized to be used as a JSX component
export const NotificationContextProvider = (props) => {
  // initial state is an empty string (no notification)
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <notificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </notificationContext.Provider>
  )
}
//comment
export default notificationContext