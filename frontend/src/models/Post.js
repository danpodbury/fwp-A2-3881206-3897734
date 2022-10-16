class Post{
    constructor({post_id, user, body, timestamp, imageURL, parentId, childIds}) {
      this.post_id = post_id;
      this.user_id = user.user_id;
      this.name = user.name;
      this.body = body;
      this.timestamp = timestamp;
      this.imageURL = imageURL;
      this.parentId = parentId;
      this.childIds = childIds; //Array of ids
    }
}

export default Post;