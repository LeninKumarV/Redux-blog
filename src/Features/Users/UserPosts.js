import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

const UserPosts = () => {

    const {id}=useParams();
    const posts=useSelector((state)=>state.posts.post);
    const userPosts=posts.filter((p)=>Number(p.userId)===Number(id));
    const display=userPosts.map((m)=>{
        return(
            <li key={m.id}><Link to={`/viewPost/${m.id}`}>{m.title}</Link></li>
        )
    })

return (
    <div>
        <h2>User Post Details</h2>
        <ul>
            {display}
        </ul>
    </div>
  )
}

export default UserPosts