import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const UsersList = () => {

   const users=useSelector((state)=>state.users.user);
   const usersList=users.map((u)=>{
        return(
            <li key={u.id}><Link to={`/userPost/${u.id}`}>{u.name}</Link></li>
        )
   })    
   
   return (
    <div>
        <h2>Users List</h2>
        <ul>
            {usersList}
        </ul>
    </div>
  )
}

export default UsersList