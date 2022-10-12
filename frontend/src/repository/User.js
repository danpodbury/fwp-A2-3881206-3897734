import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
//const USER_KEY = "s3881206";

// ------------------------------------------------------------------------------------------------

function updateLocalUser(currentUser){
    return localStorage.setItem("currentUser",JSON.stringify(currentUser));
}

// [POST] Create new User
export async function registerUser(user){
    const response = await axios.post(API_HOST + "/api/users", user);
    
    return response.data;
}

// [GET] Return a specific user
export async function getUserById(id){
    const response = await axios.get(API_HOST + `/api/users/select/${id}`);
    const user = response.data;

    //save user to local
    if(user !== null) {
        updateLocalUser(user)
        return response.data;
    } else {
        return null
    }
}

// [PATCH] Update a specific user
export async function updateUser(user){
    console.log("updating user")
    const response = await axios.patch(API_HOST + `/api/users/update/${user.user_id}`, user);
    const newuser = response.data;

    //save user to local    
    if(user !== null) {
        updateLocalUser(newuser)
        console.log(`reponse: ${JSON.stringify(response)}`)
        return response.data;
    } else {
        return null
    }
}

// this function verifyUser stolen from week 8 tut
export async function verifyUser(email, password) {
    const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
    const user = response.data;

    //save user to local
    if(user !== null) {
        updateLocalUser(user)
        return response.data;
    } else {
        return null
    }
  }

// Read
export async function doesUserExist(id){
    const response = await axios.get(API_HOST + `/api/users/select/${id}`);
    
    return (response.data.length() > 0)
}

// Delete (remove completely)
export async function deleteUserById(id){
    const response = await axios.delete(API_HOST + `/api/users/select/${id}`);
    return response.data;
}
