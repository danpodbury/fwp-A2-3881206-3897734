// this file was adapted from week 8 lab
const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Update one user from the database.
exports.update = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  user.set({
    name: req.body.name,
    email: req.body.email
  });
  await user.save();

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);

  // console.log(`pw: ${req.query.password}`)
  // console.log(`hash: ${req.query.password_hash}`)
  // let good =  await argon2.verify(user.password_hash, req.query.password);
  // console.log(`legit: ${good}`)

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false){
    // Login failed.
    console.log("fail")
    res.json(null);
  } else {
    console.log("succ")
    res.json(user);
  }

};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash,
    name: req.body.name,
    join_date: req.body.join_date
  });

  res.json(user);
};
