class Reaction{
    constructor({post_id=-1, user, type}) {
      this.post_id = post_id;
      this.user_id = user.user_id;
      this.type = type;
    }
}

export default Reaction;