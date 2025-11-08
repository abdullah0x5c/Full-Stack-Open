import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

export const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filter: filterReducer
  }
})