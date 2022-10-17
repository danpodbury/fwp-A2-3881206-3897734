
// this file was adapted from week 8 lab
const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(posts);
};

// Select one post from the database.
exports.one = async (req, res) => {
  const post = await db.post.findByPk(req.params.id);

  res.json(post);
};

// Update one post from the database.
exports.update = async (req, res) => {
  const post = await db.post.findByPk(req.params.id);

  post.set({
    body: req.body.body,
    imageURL: req.body.imageURL
  });
  await post.save();

  res.json(post);
};

// Create a post in the database.
exports.create = async (req, res) => {
  console.log("Creating Post: "+ JSON.stringify(req.body));

  // extract post from json
  const post = await db.post.create({
    body: req.body.body,
    user_id: req.body.user_id,
    imageURL: req.body.imageURL,
    timestamp: Date.now(),
    parent: null,
    children: null 
  });
  let childPost = await db.post.findByPk(post.post_id);
  console.log("childPost: "+ JSON.stringify(childPost));

  // find parent post if it exists
  if(req.body.parentId){
    console.log("Searching for post parent with id: "+ req.body.parentId);
    parentPost = await db.post.findByPk(req.body.parentId);
    console.log("Found parent: " + JSON.stringify(parentPost));

    // Link parent to child
    if(parentPost.children === null){
      // add this post as first child to parent
      console.log("adding first child")
      var response = await parentPost.set({children: [childPost.post_id]});
    }
    else{
      // add this post as additional child to parent
      console.log("adding next child")
      var response = await parentPost.children.add(childPost.post_id);
    }
    await parentPost.save();
    console.log("Response to adding: " + JSON.stringify(response));

    // Link child to parent
    post.set({parent: parentPost})
  }

  res.json(post);
};

// Create a user in the database.
exports.destroy = async (req, res) => {
  
  // TODO: how do we handle parents and child posts?

  const post = await db.post.findByPk(req.params.id);
  if (post) {
    post.destroy()
  }

  res.json(post);
};