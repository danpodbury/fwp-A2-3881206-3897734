import axios from "axios";
import Relation from "../models/Relation";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
//const USER_KEY = "s3881206";

// ------------------------------------------------------------------------------------------------

// Create
export async function addFollowRelation(subscriberId, publisherId){
    var relation = new Relation({sub_id:subscriberId, pub_id:publisherId});
    const response = await axios.post(API_HOST + "/api/follows/", relation);

    return response.data;
}

// Read (Get users following this publisher)
export async function getFollowers(PublisherId){
    const response = await axios.get(API_HOST + "/api/follows/subs/"+PublisherId);
    if(response.data !== null) {
        return response.data;
    } else {
        throw Error("Cannot retreive followers");
    }
}
// Read (Get users this subscriber follows)
export async function getFollowees(subscriberId){
    const response = await axios.get(API_HOST + "/api/follows/pubs/"+ subscriberId);
    if(response.data !== null) {
        return response.data;
    } else {
        throw Error("Cannot retreive followees");
    }
}

// Remove
export async function removeReaction(reaction){
    const response = await axios.delete(API_HOST + "/api/reactions/" + reaction.id);

    return response.data;
}