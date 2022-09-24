import * as TimelineRepo from './repository/Timeline';
import Comment from './Comment';


function UserPosts(props) {

    function handleReply(){
        console.log("Not yet implimented");
    }

    return (
    <div>
        {}
        {TimelineRepo.getUserPostsById(props.userId).map((p) => {
            return (<Comment post={p} level="0" replyFunc={handleReply} key={"post_"+p.post_id} isRecord={false}/>);
        })}
    </div>
    );
}


export default UserPosts;
