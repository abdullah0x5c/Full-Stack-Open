import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from "../services/anecdotes.js"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      return state.map(a => (a.id !== id ? a : { ...a, votes: a.votes + 1 }))
    },
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initiateAnecdotes = () => {
  return async (dispatch) => {
    const content = await anecdoteServices.getAll()
    dispatch(setAnecdotes(content))
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    newA = await anecdoteServices.addAnecdote(content)
    dispatch(newAnecdote(newA))
  }
}

export const addNewVote = (id) => {
  return async (dispatch, getState) => {
    const changed = getState().anecdotes.find(a => a.id === id)
    await anecdoteServices.addVote(changed)
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer