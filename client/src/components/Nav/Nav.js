import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
        <div className='navbar'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jaime">Feed</Link></li>
        </div>
    );
}


export default Nav;