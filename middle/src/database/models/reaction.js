// this file was taken from week 8 lab
module.exports = (sequelize, DataTypes) =>
  sequelize.define("reaction", {
    reaction_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
