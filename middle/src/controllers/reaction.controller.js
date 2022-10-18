
const db = require("../database");


// Get all the reactions
exports.all = async (req, res) => {
  const reactions = await db.reaction.findAll();
  res.json(reactions);
};

// Create a reaction in the database.
exports.create = async (req, res) => {
  console.log("Adding reaction: "+ JSON.stringify(req.body));

  res.json(req.body);
};

// Update a reaction in the database.
exports.update = async (req, res) => {
  console.log("Update reaction: "+ JSON.stringify(req.body));

  res.json(req.body);
};

// Remove a reaction in the database.
exports.destroy = async (req, res) => {
  console.log("Removing reaction: "+ JSON.stringify(req.body));

  res.json(req.body);
};