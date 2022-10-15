import '../App.css';
import './Profile.css';
import React from 'react';
import {useState} from 'react';
import useInput from '../hooks/useInput';
import { ConfirmationModal } from '../components/Modal';
import NotAuthorized from './/NotAuth';
import UserPosts from '../components/UserPosts';
import * as UserRepo from '../repository/User';
import * as TimelineRepo from '../repository/Timeline';
import { useNavigate } from "react-router-dom";


function Profile() {
    const [isEdit, setIsEdit] = useState(0);
    const nav = useNavigate();

    // Only allow members to access this page
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn == null){
        localStorage.setItem("isLoggedIn", "false");
    }

    // Toggle between edit mode and static
    const handleEdit = (evt) => {
        setIsEdit(!isEdit)
    };

    const handleDelete = () => {
        //var userRecords = JSON.parse(localStorage.getItem("users"));
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
        TimelineRepo.removeUsersPosts(currentUser.id)
        UserRepo.deleteUserById(currentUser.id);

        localStorage.setItem('isLoggedIn', "false");
        
        nav("/");
        window.location.reload();
    }

    const userDetails = JSON.parse(localStorage.getItem("currentUser"));
    // Render
    return (
        <div>
        {isLoggedIn === "true" ? 
        <div className="App">
            <div id="profile-display">
            <div className="centered-profile-wrapper">
                <div className="form-container" style={{"width":"80%","margin":"10px"}}>
                    My Profile
                    
                    {isEdit ? 
                    <EditProfile handleEdit={event => handleEdit()}/> : 
                    <StaticProfile handleEdit={event => handleEdit()}/>}

                    <ConfirmationModal buttonText={"Delete Account"} onConfirm={handleDelete} confirmText={"Yes, Delete Account"} body={"Deleting your account is permanent!!<br/> Are you absolutely sure you want to continue?"}/>
                </div>
                <div className="form-container" style={{"width":"80%"}}>
                    My Posts
                    <UserPosts userId={userDetails.user_id}/>
                </div>
            </div>
            </div>
            
        </div> 
        : <NotAuthorized/>}
        </div>
    );
}

// Display static user profile info
function StaticProfile({handleEdit}){
    const userDetails = JSON.parse(localStorage.getItem("currentUser"));
    var date = new Date(userDetails.join_date);

    // Render
    return (
    <div data-testid="container-StaticProfile">
        <div style={{"fontSize":"14pt","padding":"20px 0px"}}>
            <label>Name: {userDetails.name}</label>
            <div>Email: {userDetails.email}</div>
            <div>Join date: {date.toLocaleTimeString()} {date.toLocaleDateString()}</div>
        </div>
        <div>
            <button type="button" className="btn btn-primary" onClick={handleEdit} data-testid="btn-edit">Edit Details</button>
        </div>
    </div>
    );
}

// Form to allow user to update profile information
function EditProfile({handleEdit}){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Set up form state
    const { value:Name, bind:bindName } = useInput(currentUser.name);
    const { value:Email, bind:bindEmail } = useInput(currentUser.email);
  
    // Update localStorage on submit
    const handleSubmit = (evt) => {
        evt.preventDefault();
        //alert(`Updating Name => ${Name} \n Email => ${Email}`);

        // get user records
        //var userRecords = JSON.parse(localStorage.getItem("users"));
        
        // update current user record
        currentUser.name = Name;
        currentUser.email = Email;
        // localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // post to backend
        UserRepo.updateUser(currentUser);
        
        handleEdit();
    } 

    // Render
    return (
    <div style={{"fontSize":"14pt","padding":"20px 0px"}} data-testid="container-EditProfile">
        <form onSubmit={handleSubmit}>
            <div className="mb-8">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input className="form-control" type="text" {...bindName}  data-testid="form-name"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input className="form-control" type="email" {...bindEmail} data-testid="form-email" />
            </div>
            <button type="button" className="btn btn-secondary" onClick={handleEdit}>Cancel</button>
            <button type="submit" className="btn btn-primary" data-testid="btn-update">Update</button>
        </form>
    </div>
    );
}


export default Profile;
