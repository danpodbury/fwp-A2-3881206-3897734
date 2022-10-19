import '../App.css';
import './Posting.css';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import * as TimelineRepo from '../repository/Timeline';
import { useState, useEffect } from 'react';
import PostComponent from '../components/PostComponent';

// Timeline for members to view and post
function FolowerPosts(){
    const nav = useNavigate();
    const maxLength = 600;

    //Set up posting form
    const [loading, setLoading] = useState(true);
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        setLoading(true);
        //Should get the posts of all the user is following
        TimelineRepo.getRootPosts().then((result) => {
            setLoading(false);
            setTimeline(result);
        });
    }, []);

    
    return (
        <div className="App">
        <header className="App-header" style={{"justifyContent":"start","paddingBottom":"100px"}}>
        <div style={{"width":"80%","maxWidth":"800px"}}>
        {
        loading ? 
        <p className="centered-text">Loading...</p>
        :
        timeline.map((p) => {
            return (<PostComponent post={p} key={"post"+p.post_id}/>);
        })
        }
        </div>
        </header>
    </div>
    );
}

export default FolowerPosts;