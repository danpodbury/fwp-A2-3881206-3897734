
const db = require("../database");


// Create a post in the database.
exports.create = async (req, res) => {
  console.log("Reacting: "+ JSON.stringify(req.body));


  res.json(req.body);
};


// Create a post in the database.
exports.destroy = async (req, res) => {
  console.log("removing reaction: "+ JSON.stringify(req.body));


  res.json(req.body);
};