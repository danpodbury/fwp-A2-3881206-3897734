import smileySvg from '../images/reactions/smiley.svg';
import cryingSvg from '../images/reactions/crying.svg';
import loveSmileSvg from '../images/reactions/love-smile.svg';
import nervousSvg from '../images/reactions/nervous.svg';
import cryingLaugingSvg from '../images/reactions/crying-laughing.svg';
import "./Reactions.css"
import {useState} from 'react';


function Reaction() {
    //Keeps track of user current reaction
    const [userReaction, setUserReaction] = useState("");
    //List of valid reactions
    const validReactions = ["smiley","cryingLaughing","nervous","loveSmile","crying"]
    function onReaction(reactionString){
    //Checks if reaction is valid
    if(validReactions.includes(reactionString)){
      setUserReaction(reactionString);
      //TODO: Update the database
    }
    else{
      console.log("Reaction: " + reactionString + " is not a valid reaction");
    }
  }
  return(
    <div>
    <br/><br/><br/>
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked={userReaction === "cryingLaughing" ? "True" : ""} onClick={()=>onReaction("cryingLaughing")}/>
      <label class="btn btn-outline-primary reaction-button" for="btnradio1"><img src={cryingLaugingSvg} alt="cryingLaugingSvg" className='reaction-img'/></label>
      <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked={userReaction === "nervous" ? "True" : "" } onClick={()=>onReaction("nervous")}/>
      <label class="btn btn-outline-primary reaction-button" for="btnradio2"><img src={nervousSvg} alt="nervousSvg" className='reaction-img'/></label>
      <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" checked={userReaction === "smiley" ? "True" : ""} onClick={()=>onReaction("smiley")}/>
      <label class="btn btn-outline-primary reaction-button" for="btnradio3"><img src={smileySvg} alt="smileySvg" className='reaction-img' /></label>
      <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" checked={userReaction === "loveSmile" ? "True" : ""} onClick={()=>onReaction("loveSmile")}/>
      <label class="btn btn-outline-primary reaction-button" for="btnradio4"><img src={loveSmileSvg} alt="loveSmileSvg" className='reaction-img' /></label>
      <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" checked={userReaction === "crying" ? "True" : ""} onClick={()=>onReaction("crying")}/>
      <label class="btn btn-outline-primary reaction-button" for="btnradio5"><img src={cryingSvg} alt="cryingSvg" className='reaction-img' /></label>
    </div>
    </div>
   );
}

export default Reaction;