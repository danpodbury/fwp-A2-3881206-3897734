import "./PostComponent.css";
import Post from '../models/Post.js';
import {useState} from 'react';
import profilePhoto1 from "../images/profilePhotos/placeholdeProfilePhoto1.jpg";
import profilePhoto2 from "../images/profilePhotos/placeholdeProfilePhoto2.jpg";
import profilePhoto3 from "../images/profilePhotos/placeholdeProfilePhoto3.jpg";
import profilePhoto4 from "../images/profilePhotos/placeholdeProfilePhoto4.jpg";
import profilePhoto5 from "../images/profilePhotos/placeholdeProfilePhoto5.jpg";
import profilePhoto6 from "../images/profilePhotos/placeholdeProfilePhoto6.jpg";
import Reactions from "./Reactions";
import * as TimelineRepo from '../repository/Timeline';
import { ConfirmationModal } from "./Modal";

//Is passed a post obj through
function PostComponent({post}){
    console.log(post);
    var modalTextBoxValue = "";

    const ModalContent = ()=>{
        const [textBoxValue, setTextBoxValue] = useState("");
        function textBoxControler(value){
            setTextBoxValue(value);
            modalTextBoxValue = value;
        }
        //Could use useEffect hook to make sure that the text box goes blank every time
        return(
        <div>
            <textarea className="form-control" type="text" placeholder="How are you staying agile today?" value={textBoxValue} onChange={event=>{textBoxControler(event.target.value)}} maxLength={250} />
        </div>
        );
    };

    const ReplyToPost = ()=>{
        //limit post length
        //console.log(modalTextBoxValue.length);
        if (modalTextBoxValue.length === 0 || modalTextBoxValue.length > 250){ // todo: change to 600
            alert("Posts must be between 1 and 250 characters");
            return;
        }
        let user = JSON.parse(localStorage.getItem("currentUser"));
        let replyPost = new Post({user: user, body: modalTextBoxValue, parentId: post.post_id});
        // send post to database
        TimelineRepo.addPost(replyPost);
    }
        

    //Gets the profile image
    function getProfileImg(){
        const possiblePhotos = [profilePhoto1, profilePhoto2, profilePhoto3, profilePhoto4, profilePhoto5, profilePhoto6];
        //Randomly gets a profile photo based on id
        return possiblePhotos[(post.user_id) % possiblePhotos.length];
    }

    return(
        <div className="card behind-content" style={{margin: "20px"}}>
            <div class="card-body">
                <span className="display-inline">
                    <img className="profile-img" src={getProfileImg()} alt="Profile"/>
                    <hp class="card-title">{post.name}</hp>
                </span>
                <h6 class="card-subtitle mb-2 text-muted">Posted on: {post.timestamp}</h6>
                <p class="card-text">{post.body}</p>
                {
                    post.imageURL ?
                    <img src={post.imageURL} alt="Post"/> 
                    :
                    <></>
                }
            </div>
            <div className="card-footer inline-spread" role="group">
                <ConfirmationModal buttonText={"Reply"} onConfirm={ReplyToPost} confirmText={"Reply"} confirmStyling={"btn-success"} buttonStyling={"btn-secondary"} body={<ModalContent/>}/>
                <Reactions postId={post.post_id} key={post.post_id}/>
            </div>
        </div>
    );
}
export default PostComponent;