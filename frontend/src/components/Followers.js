import {useState, useEffect } from 'react';
import * as FollowerRepo from '../repository/Follow';
import UserTile from './UserTile';

function Followers({userId}) {
    var [followers, setFollowers] = useState([]);
    var [loading, setLoading] = useState(true);

    // Check this user exits
    useEffect(()=>{
        async function loadFollowers(){
            setFollowers( await FollowerRepo.getFollowers(userId) );
            setLoading(false);
        }
        loadFollowers();

    },[loading, userId])


    // Render
    return (<>        
    {
        loading ? 
        <p className="centered-text">Loading...</p>
        :
        followers.map((follow) => {
            return (<UserTile userId={follow.subscriber_id} />);
        })
    }
    </>);
}

export default Followers;