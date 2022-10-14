import * as TimelineRepo from '../repository/Timeline';
import Comment from './Comment';
import { useEffect, useState } from 'react';


function UserPosts(props) {

    function handleReply(){
        console.log("Not yet implimented");
    }
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(<span>loading...</span>);
    useEffect(()=>{
        async function getPosts(){
            let ps = await TimelineRepo.getUserPostsById(props.userId)
            let render = ps.map((p) => {
                console.log("<== render comment ==>")
                return (<Comment post={p} level="0" replyFunc={handleReply} key={"post_"+p.post_id} isRecord={false}/>);
            })
            setLoading(false)
            setPosts(render);
            
        } 
        getPosts();
    },[props.userId])


    return (
        <div>{ (loading)?<span>loading</span>: [posts] }</div>
    );
}


export default UserPosts;
