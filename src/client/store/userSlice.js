import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isUserLogged: false,
  userName: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleUserLogged: (state, action) => {
      state.isUserLogged = action.payload
    },
    setUserName: (state, action) => {
      state.userName = action.payload
    },
    rewriteUserStore: (state, action) => {
      state.userName = action.payload.userName
      state.isUserLogged = action.payload.isUserLogged
    },
  },
})

const { reducer } = userSlice
export default reducer

export const { toggleUserLogged, setUserName, rewriteUserStore } =
  userSlice.actions
