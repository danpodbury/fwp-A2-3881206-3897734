import './NavBar.css';
import React from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function MemberBar() {

  const nav = useNavigate();
  var user = JSON.parse(localStorage.getItem("currentUser"));
  if (user == null){
    localStorage.setItem("isLoggedIn", "false");
  }
  // Clear the isLoggedIn flag and route home
  const handleSignOut = (evt) => {
    evt.preventDefault();

    alert("Logging out");

    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("currentUser", "{}");

    nav("/");
    window.location.reload();
  };

  // Render
  return (
    <div className='nav-link-container'>
      <div className="nav-link">
        <Link to="/profile">Welcome, {user.name}.</Link>
      </div>
      <div className="nav-link">
        <Link to="/" onClick={handleSignOut}>Sign Out</Link>
      </div>
    </div>
  );
}

export function GuestBar(){
  // Render
  return (
    <div className='nav-link-container'>
      <div className="nav-link">
        <Link to="/signup">Sign Up</Link>
      </div>
      <div className="nav-link">
        <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}
