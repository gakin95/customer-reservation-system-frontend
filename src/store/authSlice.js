import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  details: {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state,action) => {
      state.details = action.payload
    },
    logout: (state,action) => {
        state.details = action.payload
    },
  },
})

export const { authSuccess, logout } = authSlice.actions

export default authSlice.reducer