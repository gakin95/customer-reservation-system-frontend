import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  permissions: [],
}

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    ongetPermissionSuccess: (state,action) => {
      state.permissions = action.payload
    },
  },
})

export const { ongetPermissionSuccess } = permissionsSlice.actions

export default permissionsSlice.reducer