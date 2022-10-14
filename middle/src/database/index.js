// this file was adapted from week 8 lab
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);

// Relate post and user.
//Old relationship v
/*
db.post.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false } });
db.post.belongsTo(db.post, { foreignKey: { name: "children", allowNull: false } });
db.post.hasMany(db.post, { foreignKey: { name: "parent", allowNull: true } });
*/
//New relationship v
db.post.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false } });
db.post.belongsTo(db.post, { foreignKey: { name: "parent", allowNull: true } });
db.post.hasMany(db.post, { foreignKey: { name: "children", allowNull: true } });

// I think the above is right
// https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedUsers();
};

async function seedUsers() {
  const userCount = await db.user.count();

  // Only seed data if necessary.
  if(userCount > 0)
    return;

  // Create users
  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ email: "dpod@email.com", password_hash: hash, name: "Dan", join_date : null });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ email: "oliG@email.com", password_hash: hash, name: "Oliver", join_date : null });

  // Create Root post
  // theres probably a better way to do this,
  // but all posts that arent replies, have this post as their parent
  await db.post.create({ body: "root", timestamp: DateTime.now(), imageURL: null })
}

module.exports = db;
