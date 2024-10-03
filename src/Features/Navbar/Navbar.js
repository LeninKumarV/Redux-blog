import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {
  return (
    <section className='navbar'>
        <div>
            <h2>Redux Blog</h2>
        </div>
        <div>
            <nav>
                <ul>
                    <Link to="/" className='link'>Home</Link>
                    <Link to="/addPost" className='link'>Post</Link>
                    <Link  to="/usersList" className='link'>Users</Link>
                </ul>
            </nav>
        </div>
    </section>
  )
}

export default Navbar