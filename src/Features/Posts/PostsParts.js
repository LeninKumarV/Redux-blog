import React from "react";
import UserDeatils from "../Users/UserDeatils";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PostsParts = ({p}) => {

  return (
    <article>
      <h3>{p.title}</h3>
      <p>{String(p.body).substring(0,100)}...</p>
      <Link to={`/viewPost/${p.id}`}  style={{fontSize:"15px"}}> View Post</Link>
      <p className="postCredit">
        <UserDeatils userId={p.userId} />
      </p>
      <TimeAgo timestamp={p.date} />
      <ReactionButtons post={p} />
    </article>
  );
};

export default PostsParts;
