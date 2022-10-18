import smileySvg from '../images/reactions/smiley.svg';
import cryingSvg from '../images/reactions/crying.svg';
import loveSmileSvg from '../images/reactions/love-smile.svg';
import nervousSvg from '../images/reactions/nervous.svg';
import cryingLaugingSvg from '../images/reactions/crying-laughing.svg';
import "./Reactions.css"
import {useState} from 'react';
import * as ReactionRepo from '../repository/Reaction';
import * as Model from '../models/Reaction.js';


function Reaction({postId}) {
    //Keeps track of user current reaction
    const [userReaction, setUserReaction] = useState("");

    //List of valid reactions
    const validReactions = ["smiley","cryingLaughing","nervous","loveSmile","crying"];
    const images = {"smiley":smileySvg,"cryingLaughing":cryingLaugingSvg,"nervous":nervousSvg,"loveSmile":loveSmileSvg,"crying":cryingSvg};
   
    function onReaction(event){
        event.preventDefault()

        //Checks if reaction is valid
        if(validReactions.includes(event.target.value)){

            setUserReaction(event.target.value);
            console.log("Reaction: " + event.target.value);

            // Add new reaction or update existing
            let user = JSON.parse(localStorage.getItem("currentUser"));
            let type = validReactions.indexOf(event.target.value)

            let reaction = new Model.Reaction({post_id: postId, user: user, type: type});
            ReactionRepo.setReaction(reaction);
        }
        else{
            console.log("Reaction: " + event.target.value + " is not a valid reaction");
        }
    }

    return(
        <div>
        <div class="btn-group" aria-label="Basic radio toggle button group" onChange={event=>onReaction(event)}>
        {validReactions.map((reaction)=>(
            <div>
            <input type="radio" class="btn-check" name={`radioButton${postId}`} id={reaction+postId} autocomplete="off" value={reaction}/>
            <label class="btn btn-outline-primary reaction-button" for={reaction+postId}><img src={images[reaction]} alt={reaction} className='reaction-img'/></label>
            </div>
        ))}
        </div>
        </div>
    );
}

export default Reaction;