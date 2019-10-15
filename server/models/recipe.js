"use strict";
module.exports = (sequelize, DataTypes) => {
  const Recipie = sequelize.define(
    "Recipie",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      direction: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {}
  );
  Recipie.associate = function(models) {
    Recipie.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Recipie;
};
