import '../App.css';
import './Posting.css';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import Post from '../models/Post';
import NotAuthorized from './NotAuth';
import Comment from '../components/Comment';
import * as TimelineRepo from '../repository/Timeline';
import FileUploader from '../components/FileUploader'
import axios from 'axios';
import { useState } from 'react';


function Posting() {

    // Only allow members to access this page
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn == null){
        localStorage.setItem("isLoggedIn", "false");
    }
    
    // Render
    return (<>
        {isLoggedIn === "false" ? 
        <NotAuthorized/> : 
        <Timeline/>}
    </>);
}

// Timeline for members to view and post
function Timeline(){
    const nav = useNavigate();

    //Set up posting form
    const { value:postBody, bind:bindPostBody, reset:resetPostBody } = useInput("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeline, setTimeline] = useState([]);


    TimelineRepo.getRootPosts().then(
        (result)=>{
            setLoading(false);
            setTimeline(result);
        }
    ).catch(
        (error)=>{
            console.log(error);
        }
    )
    
    // put timeline in reverse chronological order
    //timeline.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : -1)
    
    // Make a new post on the timeline
    async function handleNewPost(evt){
        evt.preventDefault()

        //limit post length
        console.log(postBody.length)
        if (postBody.length === 0 || postBody.length > 250){ // todo: change to 600
            alert("Posts must be between 1 and 250 characters")
            return;
        }

        // create new post
        let user = JSON.parse(localStorage.getItem("currentUser"));
        let timestamp = Date.now();
        let post = new Post(user, postBody, timestamp);

        //attach image if present
        if (selectedFile != null){
            const formData = new FormData();
            formData.append("image", selectedFile);
        
            // Yes I know the API key should absolutely not be here
            // In production/A2 onwards a new key will be secured on the backend
            const super_secret_api_key = "d893acba030fb10633893068fb1d5783"

            await axios
            .post(`https://api.imgbb.com/1/upload?expiration=600&key=${super_secret_api_key}`, formData)
            .then((res) => {
                alert("File Upload success");
                post.imageURL = res.data.data.display_url
            })
            .catch((err) => alert("File Upload Error"));
        }

        // send post to database
        TimelineRepo.addPost(post)

        // reset
        resetPostBody();
        nav("/post");
    } 

    // Reset the timeline
    function debugClearPosts(){
        localStorage.setItem('timeline', "[]");
        nav("/post");
    }

    // Add a reply
    function handleReply(parent_id, body) {
        //console.log("reply to: "+ parent_id);

        // create new post
        let user = JSON.parse(localStorage.getItem("currentUser"));
        let timestamp = Date.now();
        let post = new Post(user, body, timestamp);
        post.parentID = parent_id;

        // append new post to timeline
        let id = TimelineRepo.addPost(post);

        // find parent and append this posts id to children
        let parent = TimelineRepo.getPostById(parent_id);
        parent.childIDs.push(id);

        TimelineRepo.updatePostById(parent_id, parent);
        
        nav("/post")
    }

    // Render
    return (
        <div className="App">
        <header className="App-header" style={{"justifyContent":"start","paddingTop":"160px","paddingBottom":"100px"}}>
        
        <div className='post-header'>
        <form onSubmit={handleNewPost} className="comment-new" >
            <div className="mb-8">
                {/*<label htmlFor="exampleInputName" className="form-label" >Whats on your mind?</label>*/}
                <textarea className="form-control" type="text" placeholder="How are you staying agile today?" {...bindPostBody} maxLength={250} />
            </div>
            <div style={{"display":"flex", "justifyContent": "space-between"}}>
                <FileUploader onFileSelectSuccess={(file) => setSelectedFile(file)} onFileSelectError={({ error }) => alert(error)}/>
                <div style={{"display":"flex","flexDirection":"row"}}>
                    <div style={{"fontSize":"14pt","display":"flex","alignItems":"center","marginRight":"10px"}}>{postBody.length}/250</div>
                    <button type="submit" className="btn" style={{"width":"70px", "alignSelf":"end", "backgroundColor":"orange"}}>Post</button>
                </div>
            </div>
        </form>
        </div>

        <div style={{"width":"80%","maxWidth":"800px"}}>
        {
        loading ? 
        <p className="centered-text">Loading...</p>
        :
        timeline.map((p) => {
            return (<Comment post={p} level="0" replyFunc={handleReply} key={"post_"+p.post_id} isRecord={true}/>);
        })
        }
        </div>

        <button className="btn btn-warning" onClick={debugClearPosts}>DEBUG: reset</button>

        </header>
    </div>
    );
}

export default Posting;