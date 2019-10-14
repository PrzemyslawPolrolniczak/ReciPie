"use strict";
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    "Recipe",
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
  Recipe.associate = function(models) {
    Recipe.BelongsTo(models.User, { foreignKey: "userId" });
  };
  return Recipe;
};
