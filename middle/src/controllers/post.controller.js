
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
  let parentPost=null;

  // find parent post if it exists
  if(req.body.parentId){
    console.log("Searching for post parent with id: "+ req.body.parentId);
    parentPost = await db.post.findByPk(req.body.parentId);
    console.log("Found parent: " + JSON.stringify(parentPost));

    if(!parentPost.children){
      // add this post as first child to parent
      
      var response = await parentPost.set({children: [post]});
    }
    else{
      // add this post as additional child to parent
      var response = await parentPost.children.add(post);
    }

    await parentPost.save();
    
    console.log("Response to adding: " + JSON.stringify(response));
  }

  // extract post from json
  const post = await db.post.create({
    body: req.body.body,
    user_id: req.body.user_id,
    imageURL: req.body.imageURL,
    timestamp: Date.now(),
    parent: parentPost,
    children: null 
  });


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