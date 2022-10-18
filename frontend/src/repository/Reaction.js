import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
//const USER_KEY = "s3881206";

// ------------------------------------------------------------------------------------------------

// Read
export async function getPostReactions(postId){
    const response = await axios.get(API_HOST + "/api/reactions/");
    if(response.data !== null) {
        return (response.data.filter(r => r.post_id === postId));
    } else {
        throw Error("Cannot retreive reactions");
    }
}

// export async function addReaction(reaction){
//     console.log("adding reaction: " + reaction)
//     const response = await axios.post(API_HOST + "/api/reaction/", reaction);
//     return response.data;
// }

// // Update
// export async function changeReaction(reaction){
//     const response = await axios.patch(API_HOST + "/api/reaction/" + reaction.id, reaction);
//     return response.data;
// }

// Let backend decide if a new reaction is made or an existing one is updated
export async function setReaction(reaction){
    console.log("setting reaction: " + JSON.stringify(reaction))
    const response = await axios.post(API_HOST + "/api/reactions/", reaction);

    return response.data;
}

// Remove
export async function removeReaction(reaction){
    const response = await axios.delete(API_HOST + "/api/reactions/" + reaction.id);

    return response.data;
}