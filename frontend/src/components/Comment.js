import '../App.css';
import '../pages/Posting.css';
import logo from '../images/pizza-slice.svg';
import Reply from './Reply';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as TimelineRepo from '../repository/Timeline';

function Comment(props) {
    
    const margin = parseInt(props.level) * 40 + "px"
    var post = props.post;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const nav = useNavigate();

    const [showReplyBox, setShowReplyBox] = useState(false);
    const [showAsEditable, setShowAsEditable] = useState(false);

    const [commentBody, SetCommentBody] = useState(post.body);

    // Toggle edit
    function toggleEdit(){
        setShowAsEditable(!showAsEditable)
    }

    // Edit post
    function handleEdit(evt){
        evt.preventDefault()
        post.body = commentBody
        TimelineRepo.updatePostById(post.post_id, post)

        toggleEdit()
    }

    // Delete post
    function handleDelete(){
        if (post.childIDs.length === 0){
            //if there are no replies completly kill the entry
            TimelineRepo.deletePostById(post.post_id)
        } else { 
            // this comment has replies.
            // blank out the details of the comment
            // to maintain child thread.
            TimelineRepo.redactPostById(post.post_id)
        }
        nav("/post")
    }

    // Toggle reply box
    function toggleReply(){
        setShowReplyBox(!showReplyBox)
    }

    // Find child posts
    function subPosts() {
        return TimelineRepo.getPostsByParentId(post.post_id)
    }
    const childComments = subPosts();

    // Render
    return (<>    
    <div className='comment' style={{"marginLeft":margin}} data-testid="comment">
        <div className='comment-icon'>
            <img src={logo} alt="logo" />
        </div>
        <div className='comment-body'>
            <div className='comment-name'>
                <div>
                    <Link to={`/user/${post.user_id}`}>{post.name}</Link>
                </div>
                <div className='date'> {new Date(post.timestamp).toLocaleDateString()} </div>
                <div className='time'> {new Date(post.timestamp).toLocaleTimeString()}</div>
            </div>
            <div className='comment-text'>  
                {!showAsEditable ? post.body : 
                <textarea value={commentBody} onChange={evt => {SetCommentBody(evt.target.value)}}></textarea>}
                {(post.imageURL != null)?<img src={post.imageURL} alt="[]"/> : <></>}
            </div>
            <div className='comment-actions'>
                { (!showAsEditable && props.isRecord)? <button className="btn" onClick={toggleReply} style={{"backgroundColor":"orange"}}>Reply</button> : <></>}
                
                {//TODO: use a better validation method than name
                (currentUser.name === post.name) ? 
                    (showAsEditable)? <>
                        <button className="btn btn-secondary" onClick={toggleEdit}>Cancel</button>
                        <button className="btn btn-success" onClick={handleEdit}>Save</button>
                    </> : <>
                        <button className="btn btn-outline-secondary" onClick={toggleEdit}>Edit</button>
                        <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
                    
                </> : <></>}
            </div>
        </div>
    </div>
    {showReplyBox ? <Reply post_id={post.post_id} level={parseInt(props.level) + 1} replyFunc={props.replyFunc} toggleFunc={toggleReply}/> :<></>}
    {(props.isRecord) ? <>
        {childComments.map((c)=>{
        return (<Comment post={c} level={parseInt(props.level) + 1} replyFunc={props.replyFunc} key={"post_"+c.post_id} isRecord={true}/>);
        })}
    </> : <></>}


    </>);
}

export default Comment;