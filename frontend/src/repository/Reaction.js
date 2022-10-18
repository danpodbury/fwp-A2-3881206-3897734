import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
//const USER_KEY = "s3881206";

// ------------------------------------------------------------------------------------------------

// Read
export async function getPostReactions(postId){
    const response = await axios.get(API_HOST + "/api/reaction/");
    //TODO: filter by id
    
    return response.data;
}

// Create
export async function addReaction(reaction){
    const response = await axios.post(API_HOST + "/api/reaction/", reaction);

    return response.data;
}

// Update
export async function changeReaction(reaction){
    const response = await axios.patch(API_HOST + "/api/reaction/" + reaction.id, reaction);

    return response.data;
}

// Remove
export async function removeReaction(reaction){
    const response = await axios.delete(API_HOST + "/api/reaction/" + reaction.id);

    return response.data;
}