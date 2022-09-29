// General CRUD and util functions to interact with the timeline "database"
// I'll probably modify this for A2 to talk to the sql DB
// Hopefully that means the rest of the component don't have to change

function retrieveUsers(){
    let users = JSON.parse(localStorage.getItem("users"));
    if (users == null){
        users = []
        localStorage.setItem("users",JSON.stringify(users));
    }
    return users
}
function updateUsers(users){
    return localStorage.setItem("users",JSON.stringify(users));
}

// crude auto incrementing id for users
// the real database will take care of this in the future
function getNextUserIndex() {
    var users = retrieveUsers();

    var maxIndex = 0;
    users.forEach((u) => {
        if (u.id > maxIndex){
            maxIndex = u.id;
        }
    });
    return maxIndex + 1;
}

// Create
export function addUser(user){
    var users = retrieveUsers();

    user.id = getNextUserIndex();
    users.push(user);

    updateUsers(users);

    return user.id;
}

// Read
export function getUserById(id){
    var users = retrieveUsers();
    return users.filter((u) => {return u.id === id})[0];
}

// Read
export function getUserByEmail(email){
    var users = retrieveUsers();
    return users.filter((u) => {return u.email.toLowerCase() === email.toLowerCase()})[0];
}

// Read
export function doesUserExist(id){
    var users = retrieveUsers();
    return (users.filter((u) => {return u.id === id}).length !== 0);
}

// Read
export function isEmailAlreadyUsed(email){
    var users = retrieveUsers();
    return (users.filter((u) => {return u.email === email}).length !== 0);
}

//Delete (remove completely)
export function deleteUserById(id){

    // Filter this post out
    var users = retrieveUsers();
    users = users.filter((u) => { return u.id !== id });
    updateUsers(users);
}
