import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification(state, action) {
      // For primitive state we must return a value instead of mutating
      return action.payload
    },
    clearNotification() {
      return ""
    }
  }
})

export const { newNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer
