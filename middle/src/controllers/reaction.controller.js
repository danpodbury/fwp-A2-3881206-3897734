
const db = require("../database");


// Get all the reactions
exports.all = async (req, res) => {
  const reactions = await db.reaction.findAll();
  res.json(reactions);
};

// Create a reaction in the database.
exports.create = async (req, res) => {
  console.log("Adding reaction: "+ JSON.stringify(req.body));
  
  const existing = await db.reaction.findOne({ 
    where: { 
      user_id: req.body.user_id,  
      post_id: req.body.post_id,  
    } 
  });
  console.log(existing);

  if (existing){
    console.log("existing reaction, updating")

  } else {
    console.log("new, adding")
    const reaction = await db.reaction.create({
      user_id: req.body.user_id,  
      post_id: req.body.post_id, 
      type: req.body.type
    });
  }

  res.json(req.body);
};

// Update a reaction in the database.
exports.update = async (req, res) => {
  console.log("Update reaction: "+ JSON.stringify(req.body));
  const reaction = await db.reaction.findOne({ 
    where: { 
      user_id: req.body.user_id,  
      post_id: req.body.post_id,  
    } 
  });

  reaction.set({
    type: req.body.type
  });
  
  await reaction.save();
  res.json(reaction);
};

// Remove a reaction in the database.
exports.destroy = async (req, res) => {
  console.log("Removing reaction: "+ JSON.stringify(req.body));
  const existing = await db.reaction.destroy({ 
    where: { 
      user_id: req.body.user_id,  
      post_id: req.body.post_id,  
    } 
  });
  res.json(existing);
};