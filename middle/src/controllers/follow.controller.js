// this file was adapted from week 8 lab
const db = require("../database");

// Select all follower relations
exports.all = async (req, res) => {
  const relations = await db.follow.findAll();
  res.json(relations);
};

// Select all followers (subscribers) of :pub (publisher_id)
exports.subs = async (req, res) => {
  const subscribers = await db.follow.findAll({ 
    where: { 
      publisher_id: req.params.pub,  
    } 
  });

  res.json(subscribers);
};

// Select all followees (publishers) of :sub (subscriber_id)
exports.pubs = async (req, res) => {
  const publishers = await db.follow.findAll({ 
    where: { 
      subscriber_id: req.params.sub,
    } 
  });

  res.json(publishers);
};

// Select all posts of this users publishers
exports.feed = async (req, res) => {
  // get all my publishers
  const publishers = await db.follow.findAll({ 
    where: { 
      subscriber_id: req.params.id,
    } 
  });

  // get their ids
  let publisher_ids = [];
  publishers.foreach((p)=>{
    publisher_ids.push(p.publisher_id);
  })
  console.log("publisher ids:" + publisher_ids);
  
  // find all posts from those publishers
  const posts = await db.post.findAll({ 
    where: { 
      user_id: publisher_ids,
    } 
  });
  console.log("posts:" + posts);

  //return posts
  res.json(posts);
};


// Create a new follower/followee relation
exports.create = async (req, res) => {
  const relation = await db.follow.create({
    subscriber_id: req.body.subscriber_id,  
    publisher_id: req.body.publisher_id,
    timestamp: Date.now()
  });
  res.json(relation);
};

// Create a follower/followee relation
exports.destroy = async (req, res) => {
  const relation = await db.follow.destroy({ 
    where: { 
      subscriber_id: req.params.sub,  
      publisher_id: req.params.pub
    } 
  });
  res.json(relation);
};
