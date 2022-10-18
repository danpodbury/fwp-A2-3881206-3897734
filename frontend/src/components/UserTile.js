import * as UserRepo from '../repository/User';
import {useState, useEffect } from 'react';
import {Link} from "react-router-dom";

function UserTile({userId}) {
    var [user, setUser] = useState([]);
    var [loading, setLoading] = useState(true);

    // Check this user exits
    useEffect(()=>{
        async function loadFollowers(){
            setUser( await UserRepo.getUserById(userId) );
            setLoading(false);
        }
        loadFollowers();

    },[loading, userId])

    // Render
    return (
    <div>
        <Link to={`/user/${user.user_id}`}>
            <hp class="card-title">{user.name}</hp>
        </Link>
    </div>
    );

    
}

export default UserTile;