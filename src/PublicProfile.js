import './App.css';
import React, { useEffect } from 'react';
import {useState} from 'react';
import useInput from './hooks/useInput';
import { ConfirmationModal } from './Modal';
import NotAuthorized from './NotAuth';
import UserPosts from './UserPosts';
import { useParams } from 'react-router-dom';
import * as UserRepo from './repository/User';
import { useNavigate } from "react-router-dom";


function PublicProfile() {
    const {userId} = useParams();
    const nav = useNavigate();
    var [userDetails, setUserDetails] = useState([]);

    let validUser = UserRepo.doesUserExist(userId);
    // Check this user exits
    useEffect(()=>{
        if (validUser){
            setUserDetails(UserRepo.getUserById(userId));
        } else {
            nav("/Error");
            return;
        }
    },[])

      
    // Only allow members to access this page
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn == null){
        isLoggedIn = false;
        localStorage.setItem("isLoggedIn", "false");
    } else {
        isLoggedIn = JSON.parse(isLoggedIn);
    }
    
    console.log((isLoggedIn && validUser))

    // Render
    return (
        <>
        {(isLoggedIn && validUser) ? 
        <div className="App">
            <div id="profile-display">
            <header className="App-header">
                <div className="form-container" style={{"width":"80%","margin":"10px"}}>
                    User Profile
                    <div>
                        <div style={{"fontSize":"14pt","padding":"20px 0px"}}>
                            <label>Name: {userDetails.name}</label>
                            <div>Join date: {/*{date.toLocaleTimeString()} {date.toLocaleDateString()}*/}</div>
                        </div>
                    </div>
                </div>
                <div className="form-container" style={{"width":"80%"}}>
                    User Posts
                    <UserPosts userId={userId}/>
                </div>
            </header>
            </div>
            
        </div> 
        : <NotAuthorized/>}
        </>
    );
}

export default PublicProfile;
