import '../App.css';
import User from '../models/User';
import { NavLink } from "react-router-dom";
import "./Following.css";
import { useState, useEffect } from 'react';
import { ConfirmationModal } from '../components/Modal.js';
import * as FollowerRepo from '../repository/Follow';
import * as UserRepo from '../repository/User';


//For testing purposes, will need to properly implement later
//TODO: connect to backend
var tempFollowingUsers = [];
tempFollowingUsers.push(new User(100,"Dave","","","10/10/2020"));
tempFollowingUsers.push(new User(101,"Nick","","","10/11/2020"));
tempFollowingUsers.push(new User(102,"Sarah","","","1/10/2020"));
tempFollowingUsers.push(new User(103,"Alyssa","","","2/1/2019"));
tempFollowingUsers.push(new User(104,"Bruce","","","4/12/2021"));

function Following() {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
    
    const unFollowUser = (id) =>{
      FollowerRepo.removeFollow(JSON.parse(localStorage.getItem("currentUser")).user_id, id);
      setFollowingUsers(followingUsers.filter(item => item.user_id !== parseInt(id))); 
    }

    //Renders the following users
    useEffect(() => {
      getFolloweeUserList();
    }, []);

    async function getFolloweeUserList(){
      var currentUser = JSON.parse(localStorage.getItem("currentUser"));
      var tempListOfUsers = [];
      var result = await FollowerRepo.getFollowees(currentUser.user_id)
      console.log(result);
      for(var i=0; i<result.length; i++){
        const userObj = await UserRepo.getUserById(result[i]["publisher_id"]);
        console.log("User obj: "+userObj);
        tempListOfUsers.push(userObj);
      }
      console.log(tempListOfUsers);
      setFollowingUsers(tempListOfUsers);
      setLoading(false);
    }
    

    return (
      <div>
        <table className="table table-hover rightaAlignTableData">
          <thead>
            <tr>
              <th scope="col"><h4>Users you are following:</h4></th>
            </tr>
          </thead>
          <tbody>
        {!loading ? 
        followingUsers.map((user)=>(
            <tr key={"following"+user.user_id}>
              <th scope="row"><NavLink to={`/user/${user.user_id}`} className="btn btn-lg btn-primary">{user.name}</NavLink></th>
              <td><ConfirmationModal onConfirm={()=>unFollowUser(user.user_id)} buttonText="Unfollow User" body={`Are you sure you want to unfollow ${user.name}?`} confirmText="Unfollow"/></td>
            </tr>
        ))
    :
            <tr>
              <th style={{textAlign: "center"}}>Loading...</th>
            </tr>
    }
          </tbody>
        </table>
      </div>
    );
}

export default Following;