import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import UserDeatils from "../Users/UserDeatils";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { deletePost } from "./PosterSlice";

const SinglePost = () => {

    const {id}=useParams();
    const posts=useSelector((state)=>state.posts.post);
    const singlePost=posts.find((p)=>Number.parseInt(p.id)===Number.parseInt(id));
    console.log(id);

    const dispatch=useDispatch();

    const handleDelete=(id)=>{
      dispatch(deletePost({pid:id}))
    }
 return (
    <article>
      <h3>{singlePost.title}</h3>
      <p>{singlePost.body}</p>
      <Link to={`/editPost/${singlePost.id}`}  style={{fontSize:"15px"}}>Edit Post</Link>
      <br></br>
      <a  href="#" style={{fontSize:"15px"}} onClick={()=>handleDelete(singlePost.id)} >Delete Post</a>
      <p className="postCredit">
        <UserDeatils userId={singlePost.userId} />
      </p>
      <TimeAgo timestamp={singlePost.date} />
      <ReactionButtons post={singlePost} />
    </article>
    )
};

export default SinglePost;
