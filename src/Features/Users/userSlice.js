import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const USER_API="https://jsonplaceholder.typicode.com/users";
const initialState={
    user:[],
    status:"idle",
    error:null
}

export const fetchUsers=createAsyncThunk("users/fetchUsers",async()=>{
    const response=await axios.get(USER_API);
    return response.data;
});

const usersSlicePart=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state,action)=>{
            state.status="loading..."
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.status="error";
            state.error=action.error.message;
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.status="succeed";
            state.user=action.payload;       
        })
    }
})

export default usersSlicePart.reducer;