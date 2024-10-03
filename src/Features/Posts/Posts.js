import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostsParts from "./PostsParts";
import { fetchPosts } from "./PosterSlice";
import { fetchUsers } from "../Users/userSlice";

function Posts() {
  const posts = useSelector((state) => state.posts.post);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const Ustatus=useSelector((state)=>state.users.status);
  const Uerror=useSelector((state)=>state.users.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
    if(Ustatus==="idle"){
      dispatch(fetchUsers());
    }
  }, [status,Ustatus, dispatch]);

  console.log(posts);

  // console.log("sort");
  // const sorted=posts.slice().sort((a,b)=>Number(a.id)<Number(b.id));
  // console.log(sorted);


  let content;

  if (status === "succeed") {
    content=posts.map((p)=>{
      return(
        <PostsParts key={p.id} p={p} />
      )
    })
  }
  else if(status==="rejected"){
    content=`${error}`;
  }
  else if(status==="pending"){
    content="Loading....!"
  }

  return <div>{content}</div>;
}

export default Posts;
