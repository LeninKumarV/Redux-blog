import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import { useSelector } from "react-redux";

const POST_API = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  post: [],
  status: "idle", // idle,loading,succeeded,failed
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const fetchData = await axios.get(POST_API);
  return fetchData.data;
});

export const addNewPost=createAsyncThunk("posts/addNewPost",async(initialPost)=>{
  const response=await axios.post(POST_API,initialPost);
  return response.data;
});

export const editPost=createAsyncThunk("posts/editPost",async(initialPost)=>{
  const {id}=initialPost;
  const response=await axios.put(`${POST_API}/${id}`,initialPost);
  return response.data;
});

export const deletePost=createAsyncThunk("posts/deletePost",async (initialPost)=>{
  const {pid}=initialPost;
  const response=await axios.delete(`${POST_API}/${pid}`);
  return response.data;
})

export const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    // This is one of way
    // addPost:{
    //     reducer (state, action){
    //         state.push(action.payload)
    //     },
    //     prepare(title,content,userId){
    //         return{
    //             payload:{
    //                 id:nanoid,
    //                 title:title,
    //                 body:content,
    //                 userid:userId
    //             }
    //         }
    //     }
    // }

    addPost: (state, action) => {
      //immer package.. so we can here doesnot use a ...opeartor
      state.post.push(action.payload);
    },
    addReactions: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.post.find((f) => f.id === postId);
      existingPost.reactions[reaction]++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeed";
        let min = 1;
        //map will craete an new array or object
        const loadPosts = action.payload.map((p) => {
          p.date = sub(new Date(), { minutes: min++ }).toISOString();
          p.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return p;
        });

        //here wecan assign directly instead of using concat()
        state.post = loadPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled,(state,action)=>{
        try{
          action.payload.id=Number(state.post.length);
          state.post.push(action.payload);
          console.log(action.payload);
        }
        catch(error){
          console.log(error);
          
        }
      })
      .addCase(editPost.fulfilled,(state,action)=>{
        try{
          const {id}=action.payload;
          const posts=state.post.filter((f)=>Number(f.id)!== Number(id));
          posts.join(action.payload);
          state.post=posts;
        }
        catch(err){
          console.log(err);
        }
      })
      .addCase(deletePost.fulfilled,(state,action)=>{
          try{
              const {pid}=action.payload;
              const posts= state.post.filter((f)=>Number(f.id)!== Number(pid));
              state.post=posts;
          } 
          catch(err){
            console.log(err,"guh");
          }       
      })
  },
});

export default postsSlice.reducer;
export const { addPost, addReactions } = postsSlice.actions;
