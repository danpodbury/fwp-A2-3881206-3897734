import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
//const USER_KEY = "s3881206";

// ------------------------------------------------------------------------------------------------

// Create
export async function addPost(post){
    const response = await axios.post(API_HOST + "/api/posts/", post);

    return response.data;
}

// Read
export async function getPostById(id){
    const response = await axios.get(API_HOST + "/api/posts/"+id);

    return response.data;
}

// Read
export async function getRootPosts(){
    // TODO : test
    return new Promise(function(resolve, reject) {
        const response = axios.get(API_HOST + "/api/posts/");
        if(response.data !== null) {
            resolve(response.data.filter(p => p.parent_id === null));
        } else {
            reject("Cannot retreive posts");
        }
    });
}

// Read
export async function getUserPostsById(userId){
    // TODO : test
    const response = await axios.get(API_HOST + "/api/posts/");

    if(response.data !== null) {
        return response.data.filter(p => p.user_id === userId)
    } else {
        return null
    }
}


// Read 
export async function getPostsByParentId(id){
    // TODO : test
    const response = await axios.get(API_HOST + "/api/posts/");

    if(response.data !== null) {
        return response.data.filter(p => p.parent_id === id)
    } else {
        return null
    }
}

// Update
export async function updatePostById(id, modifiedPost){
    // TODO : test
    const response = await axios.patch(API_HOST + "/api/posts/" + id, modifiedPost);
    if(response.data !== null) {
        return response.data
    } else {
        return null
    }
}

//Delete (redact or remove completely)
export function removeUsersPosts(userId){
    //TODO: create delete endpoint in express
}

//Delete (redact)
export function redactPostById(postId){
    // var timeline = retrieveTimeline();

    // // search and redact the post with this id
    // timeline.forEach((p) => {
    //     if (p.post_id === postId){
    //         p.user_id = -1;
    //         p.name = "[deleted]"
    //         p.body = "[deleted]"
    //     }
    // });
    // updateTimeline(timeline);
}

//Delete (remove completely)
export async function deletePostById(postId){
    // TODO : test
    const response = await axios.delete(API_HOST + "/api/posts/" + postId);
    if(response.data !== null) {
        return response.data
    } else {
        return null
    }
}