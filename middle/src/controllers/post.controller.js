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

//
exports.root = async (req, res) => {
  const posts = await db.post.findAll({
    where: {
      parent: null //this isn't implemented
    }
  });

  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.post.create({
    body: req.body.body,
    timestamp: req.body.timestamp,
    imageURL: req.body.imageURL
  });

  res.json(post);
};
