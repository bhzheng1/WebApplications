import { Link } from "react-router-dom";
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { increaseCount, getCount } from "../features/posts/postsSlice";

const Header = () => {
    const dispath = useDispatch()
    const count = useSelector(getCount)

  return (
    <header className="Header">
        <h1>
            Redux Blog
        </h1>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="Post">Post</Link></li>
                <li><Link to="User">Users</Link></li>
            </ul>
            <button onClick={()=>dispath(increaseCount())}>{count}</button>
        </nav>
    </header>
    )
}
export default Header;
