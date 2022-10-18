import {useState, useEffect } from 'react';
import * as FollowerRepo from '../repository/Follow';
import UserTile from './UserTile';

function Following({userId}) {
    var [followees, setFollowees] = useState([]);
    var [loading, setLoading] = useState(true);

    // Check this user exits
    useEffect(()=>{
        async function loadFollowees(){
            setFollowees( await FollowerRepo.getFollowees(userId) );
            setLoading(false);
        }
        loadFollowees();

    },[loading, userId])


    // Render
    return (<>        
    {
        loading ? 
        <p className="centered-text">Loading...</p>
        :
        followees.map((follow) => {
            return (<UserTile userId={follow.publisher_id} />);
        })
    }
    </>);
}

export default Following;