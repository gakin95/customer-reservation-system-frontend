import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  countries: [],
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    onSuccess: (state,action) => {
      state.countries = action.payload
    },
  },
})

export const { onSuccess } = countriesSlice.actions

export default countriesSlice.reducer