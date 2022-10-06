// import axios from "axios";

// // --- Constants ----------------------------------------------------------------------------------
// const API_HOST = "http://localhost:4000";
// const USER_KEY = "s3881206";

function retrieveTimeline(){
    let timeline = JSON.parse(localStorage.getItem("timeline"));
    if (timeline == null){
        timeline = []
        localStorage.setItem("timeline",JSON.stringify(timeline));
    }
    return timeline
}
function updateTimeline(timeline){
    return localStorage.setItem("timeline",JSON.stringify(timeline));
}

// crude auto incrementing id for posts
// the rel database will take care of this in the future
function getNextPostIndex() {
    var timeline = retrieveTimeline();

    var maxIndex = 0;
    timeline.forEach((p) => {
        if (p.post_id > maxIndex){
            maxIndex = p.post_id;
        }
    });
    return maxIndex + 1;
}

// Create
export function addPost(post){
    var timeline = retrieveTimeline();

    post.post_id = getNextPostIndex();
    timeline.push(post);

    updateTimeline(timeline);

    return post.post_id;
}

// Read
export function getPostById(id){
    var timeline = retrieveTimeline();
    return timeline.filter((p) => {return p.post_id === id})[0];
}

// Read
export function getRootPosts(){
    var timeline = retrieveTimeline();
    return timeline.filter((p) => {return p.parentID == null});
}

// Read
export function getUserPostsById(userId){
    var timeline = retrieveTimeline();
    return timeline.filter((p) => {return p.user_id === userId});
}


// Read 
export function getPostsByParentId(id){
    var timeline = retrieveTimeline();

    var parent = getPostById(id)

    var children = []
    timeline.forEach((p) => {
        if (parent.childIDs.includes(p.post_id)){
            children.push(p)
        }
    });
    updateTimeline(timeline);

    return children
}

// Update
export function updatePostById(id, modifiedPost){
    // replace existing post at (id) with modified post
    var timeline = retrieveTimeline();
    timeline = timeline.map((p) => { return (p.post_id === id) ? modifiedPost: p});
    updateTimeline(timeline);
}

//Delete (redact or remove completely)
export function removeUsersPosts(userId){

    // keep finding any remaining posts by this user
    while (getUserPostsById(userId).length > 0){
        let timeline = retrieveTimeline();

        // find the next post
        let userPost = timeline.find((p) => {return p.user_id === userId})

        // either remove or redact it
        if (userPost.childIDs.length === 0){
            //if there are no replies completly kill the entry
            deletePostById(userPost.post_id)
        } else { 
            // this comment has replies.
            // blank out the details of the comment
            // to maintain child thread.
            redactPostById(userPost.post_id)
        }
    }
}

//Delete (redact)
export function redactPostById(postId){
    var timeline = retrieveTimeline();

    // search and redact the post with this id
    timeline.forEach((p) => {
        if (p.post_id === postId){
            p.user_id = -1;
            p.name = "[deleted]"
            p.body = "[deleted]"
        }
    });
    updateTimeline(timeline);
}

//Delete (remove completely)
export function deletePostById(postId){
    var parentId = getPostById(postId).parentID

    // Filter this post out
    var timeline = retrieveTimeline();
    timeline = timeline.filter((p) => { return p.post_id !== postId });
    updateTimeline(timeline);
 
    // Sever link with parent if it exists
    if (parentId != null){

        // locate parent
        var parent = getPostById(parentId)

        // remove reference to child
        parent.childIDs.splice(parent.childIDs.indexOf(postId), 1);

        // update parent 
        updatePostById(parentId, parent)
    }
}