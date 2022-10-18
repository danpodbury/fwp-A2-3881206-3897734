import {useState, useEffect } from 'react';
import * as FollowerRepo from '../repository/Follow';

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
            return (<li>{follow.publisher_id}</li>);
        })
    }
    </>);
}

export default Following;