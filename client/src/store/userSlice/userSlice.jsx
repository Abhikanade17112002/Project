import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: null,
  state: "ideal",
  isAuthenticated: false,
};

export const handleUserSignUpAction = createAsyncThunk("/auth/signup",async(FormData) => {
  try {
    console.log(FormData, "FORMDATA FROM USER SIGNUP ACTION");
    const response = await axios.post("http://localhost:3000/api/auth/signup",FormData,{
        headers: {
            "Content-Type": "multipart/form-data",
            },
            withCredentials: true,

    });
    console.log(response.data, "RESPONSE FROM USER SIGNUP ACTION");

    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const handleUserSignInAction = createAsyncThunk( "/auth/signin" ,async( FormData) => {
  try {
    console.log(FormData, "FORMDATA FROM USER SIGNIN ACTION");
    const response = await axios.post("http://localhost:3000/api/auth/signin",FormData,{
        withCredentials: true,
        headers:{
            "Content-Type": "application/json"
            
        }
    });
    console.log(response.data, "RESPONSE FROM USER SIGNINACTION");

    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const handleUserSignOutAction =    createAsyncThunk( "/auth/signout",async (FormData) => {
  try {
    console.log("FROM USER SIGNOUTACTION");
    const response = await axios.post("http://localhost:6000/api/auth/signout");
    console.log(response.data, "RESPONSE FROM USER SIGN OUT ACTION");

    return response.data;
  } catch (error) {
    return error.message;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleUserSignUpAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUserSignUpAction.fulfilled, (state, action) => {
        console.log(action);
        
        state.loading = false;
        state.user =  action.payload.status ? action.payload.user : null ;
        state.isAuthenticated = action.payload.status ? true: false ;
      })
      .addCase(handleUserSignUpAction.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(handleUserSignInAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUserSignInAction.fulfilled, (state, action) => {
        console.log(action);
        
        state.loading = false;
        state.user =  action.payload.status ? action.payload.user : null ;
        state.isAuthenticated = action.payload.status ? true: false ;
      })
      .addCase(handleUserSignInAction.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      }).addCase(handleUserSignOutAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUserSignOutAction.fulfilled, (state, action) => {
        console.log(action);
        
        state.loading = false;
        state.user =  null;
        state.isAuthenticated = false;
      })
      .addCase(handleUserSignOutAction.rejected, (state, action) => {
        state.loading = false;

      });
  },
});

export const getUserInfo = (state)=>state.user ;
export const getIsLoading = (state)=>state.loading ;
export const getIsAuthenticated = (state)=>state.isAuthenticated ;

export default userSlice.reducer;
export const {} = userSlice.actions ;
