class Relation{
    constructor({sub_id, pub_id}) {
      this.subscriber_id = sub_id;
      this.publisher_id = pub_id;
      this.timestamp = null;
    }
}

export default Relation;