import logo from './pizza-slice.svg';
import './NavBar.css';
import React from 'react';
import {Link} from "react-router-dom";
import {MemberBar, GuestBar} from "./UserBar";

function NavBar() {

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return (
    <div className="nav-container">
      <div className='nav-bar container-md'>
          <div className="logo" style={{"marginLeft":"10px"}}>
            <Link to ="/" >
            <img src={logo} className="" alt="logo" />
            </Link>
          </div>
          <div style={{"height":"50px", "fontSize":"20pt","fontWeight":"bolder", "display":"flex", "color":"orange"}}>
          <span>
            
          </span>
          </div>

          {isLoggedIn === "true" ? <div className='nav-button'><Link to ="/post" >Posting</Link></div> : <></>}

          {isLoggedIn === "true" ? <MemberBar/> : <GuestBar/>}

      </div>
    </div>
  );
}

export default NavBar;
