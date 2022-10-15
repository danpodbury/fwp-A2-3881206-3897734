class Post{
    constructor(user, body, timestamp=null, parent=null) {
      this.post_id = -1;
      this.user_id = user.user_id;
      this.name = user.name;
      this.body = body;
      this.timestamp = timestamp;
      this.imageURL = null;
      
      this.parentID = parent;
      this.childIDs = [];
    }
}

export default Post;