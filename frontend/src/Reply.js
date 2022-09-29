import './App.css';
import './Posting.css';
import logo from './pizza-slice.svg';
import Post from './models/Post';
import { useNavigate, Link } from 'react-router-dom';
import useInput from './hooks/useInput';


function Reply(props) {
    const nav = useNavigate();

    const margin = parseInt(props.level) * 40 + "px"
    const { value:Body, bind:bindBody, reset:resetBody } = useInput('');

    function closeThis() {
        //call super toggle function
        props.toggleFunc();
    }
    function handleSubmit(event){
        event.preventDefault(); //dont make get request
        // call super reply function
        props.replyFunc(props.post_id, Body)
        closeThis();
        nav("/post");
    }

    // Render
    return (<>    
        <div className='comment' style={{"marginLeft":margin}}>
            <div className='comment-body'>
                <form onSubmit={handleSubmit}>
                    <textarea className="form-control" type="text" placeholder="Synergy! Teamwork! Collaboration!" {...bindBody} />
                    <div className='comment-actions'>
                        <button className="btn btn-outline-secondary" onClick={closeThis}>Cancel</button>
                        <button type="submit" className="btn"  style={{"backgroundColor":"orange"}}>Reply</button>
                    </div>
                </form>
            </div>
        </div>
        </>);
}

export default Reply;