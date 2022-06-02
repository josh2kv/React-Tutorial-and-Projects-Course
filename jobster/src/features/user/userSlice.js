import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.post('/auth/register', user)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  },
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.post('/auth/login', user)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  },
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      // Bearer: token type 중 하나
      // headers의 authorization에 token type과 token을 담아 request
      const res = await customFetch.patch('/auth/updateUser', user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return res.data
    } catch (error) {
      if (error.response.status === 401) {
        // 따로 logoutUser를 import 하지 않았는데 사용 가능!?
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
      }
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser: state => {
      state.user = null
      state.isSidebarOpen = false
      removeUserFromLocalStorage()
    },
  },
  extraReducers: {
    [registerUser.pending]: state => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage(user)
      toast.success(`Hello There ${user.name}`)
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [loginUser.pending]: state => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage(user)
      toast.success(`Welcome back ${user.name}`)
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [updateUser.pending]: state => {
      state.isLoading = true
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
      addUserToLocalStorage(user)
      toast.success(`User Updated!`)
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { toggleSidebar, logoutUser } = userSlice.actions
export default userSlice.reducer
