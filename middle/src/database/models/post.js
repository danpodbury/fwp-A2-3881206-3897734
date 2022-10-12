// this file was taken from week 8 lab
module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    body: {
      type: DataTypes.TEXT, //TODO: set DataTypes to (RICH TEXT?) can't remember the type
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    imageURL: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
