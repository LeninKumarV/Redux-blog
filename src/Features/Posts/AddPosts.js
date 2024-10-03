import React, { useState } from "react";
import { addPost } from "./PosterSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addNewPost } from "./PosterSlice";

function AddPosts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector((state) => state.users.user);

  const dispatch = useDispatch();
  const addPostData = (e) => {
    e.preventDefault();
    try{
      if (title && content) {
        //      the othe method
        // dispatch(
        //   addPost(title,content,userId)
        // );
  
        dispatch(
          addNewPost({
            id: nanoid,
            userId:userId,
            title: title,
            body: content,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          })
        ).unwrap();
      }
    }
    catch(error){
     console.log(error);
        
    }
  };

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };
  const availableToSave = Boolean(title) && Boolean(content) && Boolean(userId);
  return (
    <section>
      <h3>Add Post</h3>
      <form>
        <label htmlFor="title">Add Title:</label>
        <input
          type="text"
          id="title"
          onInput={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br></br>
        <label htmlFor="authors">Author:</label>
        <select id="authors" value={userId} onChange={(e) => handleUserId(e)}>
          <option value=""></option>
          {users.map((m) => {
            return (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            );
          })}
        </select>
        <br></br>
        <label htmlFor="content">Add Content:</label>
        <textarea
          type="text"
          id="content"
          onInput={(e) => setContent(e.target.value)}
          value={content}
        />
        <button onClick={(e) => addPostData(e)} disabled={!availableToSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}

export default AddPosts;
