import '../App.css';
import './Posting.css';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import * as TimelineRepo from '../repository/Timeline';
import { useState, useEffect } from 'react';
import PostComponent from '../components/PostComponent';
import { getFeed } from '../repository/Follow';

// Timeline for members to view and post
function FolowerPosts(){
    const nav = useNavigate();
    const maxLength = 600;

    //Set up posting form
    const [loading, setLoading] = useState(true);
    const [timeline, setTimeline] = useState([]);
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        setLoading(true);
        let user = JSON.parse(localStorage.getItem("currentUser"));
        getFeed(user.user_id).then((result) => {
            setLoading(false);
            setFeed(result);
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
        feed.map((p) => {
            return (<PostComponent post={p} key={"post"+p.post_id}/>);
        })
        }
        </div>
        </header>
    </div>
    );
}

export default FolowerPosts;