import { useState, useEffect } from 'react';
import { getFeed } from '../repository/Follow';
import PostComponent from '../components/PostComponent';

function Sandbox() {
    const [loading, setLoading] = useState(true);
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("currentUser"));
        getFeed(user.user_id).then((result) => {
            setLoading(false);
            setFeed(result);
        });
    }, []);


    // Render
    return (
        <div className="App">
           <div stlye={{"marginTop": "100px"}}>Sandbox</div>   
           {
                loading ? 
                <p className="centered-text">Loading...</p>
                :
                feed.map((p) => {
                    return (<PostComponent post={p} key={p.post_id}/>);
                    
                })
            }

        </div>
    );
}

export default Sandbox;