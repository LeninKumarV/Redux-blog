import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editPost } from "./PosterSlice";

const EditPost = () => {
    const {id}=useParams();
    const posts=useSelector((state)=>state.posts.post);
    const singlePost=posts.find((p)=>Number.parseInt(p.id)===Number.parseInt(id));
    
    
    const [title, setTitle] = useState(singlePost.title);
    const [content, setContent] = useState(singlePost.body);
    const [userId, setUserId] = useState(singlePost.userId);

    const users = useSelector((state) => state.users.user);

    const dispatch=useDispatch();

    const handleUserId = (e) => {
        setUserId(e.target.value);
    };

    const availableToSave = Boolean(title) && Boolean(content) && Boolean(userId);

    const editPostData=(e)=>{
        e.preventDefault();
        dispatch(
            editPost({
              id:id,
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
            }               
        )
          )
    }

  return (
    <section>
      <h3>Edit Post</h3>
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
        <button onClick={(e) => editPostData(e)} disabled={!availableToSave}>
          Edit Post
        </button>
      </form>
    </section>
  );
};

export default EditPost;
