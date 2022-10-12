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
export function getRootPosts(){
    // TODO: get posts, filter by no parent
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
export function getPostsByParentId(id){
    // var timeline = retrieveTimeline();

    // var parent = getPostById(id)

    // var children = []
    // timeline.forEach((p) => {
    //     if (parent.childIDs.includes(p.post_id)){
    //         children.push(p)
    //     }
    // });
    // updateTimeline(timeline);

    // return children
}

// Update
export function updatePostById(id, modifiedPost){
    // // replace existing post at (id) with modified post
    // var timeline = retrieveTimeline();
    // timeline = timeline.map((p) => { return (p.post_id === id) ? modifiedPost: p});
    // updateTimeline(timeline);
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
export function deletePostById(postId){
    // var parentId = getPostById(postId).parentID

    // // Filter this post out
    // var timeline = retrieveTimeline();
    // timeline = timeline.filter((p) => { return p.post_id !== postId });
    // updateTimeline(timeline);
 
    // // Sever link with parent if it exists
    // if (parentId != null){

    //     // locate parent
    //     var parent = getPostById(parentId)

    //     // remove reference to child
    //     parent.childIDs.splice(parent.childIDs.indexOf(postId), 1);

    //     // update parent 
    //     updatePostById(parentId, parent)
    // }
}