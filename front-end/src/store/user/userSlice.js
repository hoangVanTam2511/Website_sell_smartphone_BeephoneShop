import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { request, setAuthHeader } from "../../store/helpers/axios_helper";

export const loginUser = createAsyncThunk("user/login", async (data) => {
  let user = {
    id: "",
    ma: "",
  };
  request("POST", "/client/account/login", data)
    .then((res) => {
      if (res.status === 200) {
        setAuthHeader(res.data.token)
        user = res.data
        console.log(user)
        window.localStorage.setItem('user', user);
        return res.data
      }
    })
    .catch(error => console.log(error))
  localStorage.setItem('user', JSON.stringify(user))
  return user
})

export const getUser = () => {
  var user = localStorage.getItem('user')
  return JSON.parse(user)
};

export const changeInformationUser = createAsyncThunk(
  'user/changeInformationUser',
  async data => {
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: '',
      ma: ''
    },
    error: null
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = {
          id: '',
          ma: ''
        }
        state.error = action.error.message
      })
      .addCase(changeInformationUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.error = null

      })
      .addCase(changeInformationUser.rejected, (state, action) => {
        state.user = {
          id: '',
          ma: ''
        }
        state.error = action.error.message
      })
  }
})

export default userSlice.reducer
