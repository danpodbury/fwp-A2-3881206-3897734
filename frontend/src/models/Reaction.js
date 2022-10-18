export class Reaction{
    constructor({post_id, user, type}) {
      this.reaction_id = null;
      this.post_id = post_id;
      this.user_id = user.user_id;
      this.type = type; // the reaction type, encoded as an int
    }
}

export default Reaction;