import * as TimelineRepo from '../repository/Timeline';
import Comment from './Comment';
import { useEffect, useState } from 'react';
import PostComponent from '../components/PostComponent';


function UserPosts(props) {

    // function handleReply(){
    //     console.log("Not yet implimented");
    // }
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(<span>loading...</span>);
    useEffect(()=>{
        async function getPosts(){
            let ps = await TimelineRepo.getUserPostsById(props.userId)

            setLoading(false)
            setPosts(ps);
            
        } 
        getPosts();
    },[props.userId])


    return (
    //     <div>{ (loading)?<span>loading</span>: [posts] }</div>
    <div>
        {
            loading ? 
            <p className="centered-text">Loading...</p>
            :
            posts.map((p) => {
                return (<PostComponent post={p} key={p.post_id}/>);
            })
        }
        </div>
    );
}


export default UserPosts;
