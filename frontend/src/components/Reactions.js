import smileySvg from '../images/reactions/smiley.svg';
import cryingSvg from '../images/reactions/crying.svg';
import loveSmileSvg from '../images/reactions/love-smile.svg';
import nervousSvg from '../images/reactions/nervous.svg';
import cryingLaugingSvg from '../images/reactions/crying-laughing.svg';
import "./Reactions.css"
import {useState, useEffect} from 'react';
import * as ReactionRepo from '../repository/Reaction';
import * as Model from '../models/Reaction.js';


function Reaction({postId}) {
    //Keeps track of user current reaction
    const [userReaction, setUserReaction] = useState("");
    const [reactionCounts, setReactionCounts] = useState({"smiley":0,"cryingLaughing":0,"nervous":0,"loveSmile":0,"crying":0});
    // const [loading, setLoading] = useState(true);
    /*
    useEffect(() => {
        if (loading){
            ReactionRepo.getPostReactions(postId).then((result) => {
                setReactions(result);
            });
            setLoading(false);
        }
    },[loading, postId]);
    */



    //List of valid reactions
    const validReactions = ["smiley","cryingLaughing","nervous","loveSmile","crying"];
    const images = {"smiley":smileySvg,"cryingLaughing":cryingLaugingSvg,"nervous":nervousSvg,"loveSmile":loveSmileSvg,"crying":cryingSvg};
   
    useEffect(() => {
        var currentReactionCounts = {"smiley":0,"cryingLaughing":0,"nervous":0,"loveSmile":0,"crying":0};
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        //Gets post reactions from db
        console.log("retreiving reactions from db...");
        ReactionRepo.getPostReactions(postId).then((result) => {
            //console.log(result);
            //Loops through every value
            result.forEach(element => {
                const reaction = validReactions[element.type];
                if(element.user_id === currentUser.user_id){
                    setUserReaction(reaction);
                }
                currentReactionCounts[reaction] = currentReactionCounts[reaction] + 1 || 1; //Increments the reaction counts
            });
            setReactionCounts(currentReactionCounts);
        });
        //Sets the reaction counts back
        
    },[]);

    function onReaction(event){
        //Checks if reaction is valid
        if(validReactions.includes(event.target.value)){

            //Decreases reaction of the previous reacted to post
            var oldReactionCounts = reactionCounts;
            oldReactionCounts[userReaction] = oldReactionCounts[userReaction] - 1;
            //Sets the reaction value to the new
            setUserReaction(event.target.value);
            //Increments the new value for reaction counts
            oldReactionCounts[event.target.value] = oldReactionCounts[event.target.value] + 1;
            //Sets the counts again
            setReactionCounts(oldReactionCounts);

            // Add new reaction or update existing
            let user = JSON.parse(localStorage.getItem("currentUser"));
            let type = validReactions.indexOf(event.target.value);

            let reaction = new Model.Reaction({post_id: postId, user: user, type: type});
            ReactionRepo.setReaction(reaction);
        }
        else{
            console.log("Reaction: " + event.target.value + " is not a valid reaction");
        }
    }

    return(
        <div>
            {/*
            <div>
                {
                    loading ? 
                    <p className="centered-text">Loading...</p>
                    :
                    reactions.map((r) => {
                        return (<img src={images[validReactions[r.type]]} alt={validReactions[r.type]} className='reaction-img'/>);
                    })
                }
            </div>
            */}
            <div class="btn-group" aria-label="Basic radio toggle button group" onChange={event=>onReaction(event)}>
            {validReactions.map((reaction)=>(
                <div>
                <input type="radio" class="btn-check" name={`radioButton${postId}`} id={reaction+postId} autocomplete="off" value={reaction} checked={userReaction === reaction} onChange={e => {}}/>
                <label class="btn btn-outline-primary reaction-button" for={reaction+postId}><img src={images[reaction]} alt={reaction} className='reaction-img'/><span className='white-text'>{reactionCounts[reaction]}</span></label>
                </div>
            ))}
            </div>
        </div>
    );
}

export default Reaction;