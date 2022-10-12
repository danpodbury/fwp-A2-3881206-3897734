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
  const post = await db.post.create({
    text: req.body.text,
    username: req.body.username
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