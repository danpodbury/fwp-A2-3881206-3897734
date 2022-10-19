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

// Create
export async function doesRelationExist(subscriberId, publisherId){
    const response = await axios.get(API_HOST + "/api/follows/pubs/"+subscriberId);
    
    if(response.data !== null) {
        if (response.data.length === 0){
            return false;
        }
        // console.log("data: " + JSON.stringify(response));
        // console.log("result: " + response.data.find(rel => rel.publisher_id == publisherId))
        return (response.data.find(rel => rel.publisher_id == publisherId))? true : false;
    } else {
        throw Error("Cannot find subscriber");
    }

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

// Get Feed
export async function getFeed(subscriberId){
    const response = await axios.get(API_HOST + "/api/follows/feed/" + subscriberId);

    if(response.data !== null) {
        return response.data;
    } else {
        throw Error("Cannot get Feed");
    }
}

// Remove
export async function removeFollow(subscriberId, publisherId){
    const response = await axios.delete(API_HOST + "/api/follows/" + publisherId + "/" + subscriberId);

    return response.data;
}