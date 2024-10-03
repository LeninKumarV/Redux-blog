import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReactions } from "./PosterSlice";

function ReactionButtons({ post }) {
  const reactionEmoji = {
    thumbsUp: '👍',
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  };
  const dispatch = useDispatch();

  const resultEmojis=Object.entries(reactionEmoji).map(([name,emoji])=>{
    return(
      <button type="button"
        className="reactionButton"
        onClick={()=>dispatch(addReactions({postId:post.id,reaction:name}))}
      >
        {emoji} {post.reactions[name]}
      </button>
    )   
})
  
  return (
    <div>
      {resultEmojis}
    </div>
  );
}

export default ReactionButtons;
