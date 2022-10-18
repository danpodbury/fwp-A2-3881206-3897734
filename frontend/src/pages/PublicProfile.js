import '../App.css';
import React, { useEffect } from 'react';
import {useState} from 'react';
import profilePhoto1 from "../images/profilePhotos/placeholdeProfilePhoto1.jpg";
import profilePhoto2 from "../images/profilePhotos/placeholdeProfilePhoto2.jpg";
import profilePhoto3 from "../images/profilePhotos/placeholdeProfilePhoto3.jpg";
import profilePhoto4 from "../images/profilePhotos/placeholdeProfilePhoto4.jpg";
import profilePhoto5 from "../images/profilePhotos/placeholdeProfilePhoto5.jpg";
import profilePhoto6 from "../images/profilePhotos/placeholdeProfilePhoto6.jpg";
import NotAuthorized from './NotAuth';
import UserPosts from '../components/UserPosts';
import { useParams } from 'react-router-dom';
import * as UserRepo from '../repository/User';
import { useNavigate } from "react-router-dom";
import Followers from '../components/Followers';
import Following from '../components/Followeing'

function PublicProfile() {
    const {userId} = useParams();
    const nav = useNavigate();
    var [userDetails, setUserDetails] = useState([]);
    var [validUser, setValidUser] = useState(false);

    // Check this user exits
    useEffect(()=>{
        async function validatePage(){
            var valid = await UserRepo.doesUserExist(userId);
            setValidUser(valid);
            if (valid){
                setUserDetails( await UserRepo.getUserById(userId));
            } else {
                nav("/Error");
                return;
            }
        }
        validatePage();

    },[nav, userId, validUser])

      
    // Only allow members to access this page
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn == null){
        isLoggedIn = false;
        localStorage.setItem("isLoggedIn", "false");
    } else {
        isLoggedIn = JSON.parse(isLoggedIn);
    }
    
    //Gets the profile image
    function getProfileImg(user_id){
        const possiblePhotos = [profilePhoto1, profilePhoto2, profilePhoto3, profilePhoto4, profilePhoto5, profilePhoto6];
        //Randomly gets a profile photo based on id
        return possiblePhotos[(user_id) % possiblePhotos.length];
    }

    // Render
    return (
        <>
        {(isLoggedIn && validUser) ? 
        <div className="App">
            <div id="profile-display">
                <div className="centered-profile-wrapper">
                    <div className="form-container profile-pane container-md">
                        <img className="profile-img" src={getProfileImg(userDetails.user_id)} alt="Profile"/>
                        {userDetails.name}
                        <div>
                            <div style={{"fontSize":"14pt","padding":"20px 0px"}}>
                                <div>Email: {userDetails.email}</div>
                                <div>Join date: {userDetails.join_date}</div>
                            </div>
                        </div>
                    </div>

                    <div className="form-container profile-panel container-md">
                        <h3>{userDetails.name}'s Followers</h3>
                        <Followers userId={userId}/>
                    </div>
                    <div className="form-container profile-panel container-md">
                        <h3>{userDetails.name} is Following</h3>
                        <Following userId={userId}/>
                    </div>

                    <div className="form-container profile-panel container-md">
                        <h3>{userDetails.name}'s Posts</h3>
                        <UserPosts userId={userId}/>
                    </div>
                </div>
            </div>
            
        </div> 
        : <NotAuthorized/>}
        </>
    );
}

export default PublicProfile;
