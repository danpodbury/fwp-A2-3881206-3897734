// import { useState } from 'react';
import './App.css';
import './Posting.css';
import User from './models/User';
import { NavLink } from "react-router-dom";
import "./Sandbox.css";
import { useState } from "react"
import { ConfirmationModal } from './Modal.js';
var tempFollowingUsers = [];
    tempFollowingUsers.push(new User(100,"Dave","","","10/10/2020"));
    tempFollowingUsers.push(new User(101,"Nick","","","10/11/2020"));
    tempFollowingUsers.push(new User(102,"Sarah","","","1/10/2020"));
    tempFollowingUsers.push(new User(103,"Alyssa","","","2/1/2019"));
    tempFollowingUsers.push(new User(104,"Bruce","","","4/12/2021"));
// import FileUploader from './FileUploader'
// import axios from 'axios';

function Sandbox() {
    //For testing purposes, will need to properly implement later
    //TODO: connect to backend
    
    //const [modal,setModal] = useState();
    const [followingUsers, setFollowingUsers] = useState(tempFollowingUsers);
    
    const unFollowUser = (id) =>{
      //setModal({visible: true, body: "Are you sure you want to unfollow this user?", onConfirm: ()=>(null), confirmText: "Ok"})
      setFollowingUsers(followingUsers.filter(item => item.getId() !== parseInt(id))); 
    }
    

    return (
      <div>
        <br/><br/><br/>
        <table className="table table-hover rightaAlignTableData">
          <tbody>
        {followingUsers.length > 0 ? 
        
        
        followingUsers.map((user)=>(
            <tr key={user.getId()}>
              <th scope="row"><NavLink to={`/user/${user.getId()}`} className="btn btn-lg btn-primary">{user.getName()}</NavLink></th>
              <td><ConfirmationModal onConfirm={()=>unFollowUser(user.getId())} buttonText="Unfollow User" body={`Are you sure you want to unfollow ${user.getName()}?`} confirmText="Unfollow"/></td>
            </tr>
        ))
    :
            <tr>
              <th>You are not currently follwoing anyone!</th>
            </tr>
    }
          </tbody>
        </table>
      </div>
    );
}

export default Sandbox;