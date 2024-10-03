import { configureStore } from "@reduxjs/toolkit";
import PosterSlice from "./Features/Posts/PosterSlice";
import userSlice from "./Features/Users/userSlice";

export const store=configureStore({
    reducer:{
        posts:PosterSlice,
        users:userSlice,
    } 
})