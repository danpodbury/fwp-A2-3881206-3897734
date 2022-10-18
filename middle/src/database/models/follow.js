module.exports = (sequelize, DataTypes) =>
  sequelize.define("follow", {
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
