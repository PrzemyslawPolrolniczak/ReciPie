const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    async user(_, { id }, { models }) {
      return models.User.findOne({
        where: {
          id
        }
      });
    },
    async allRecipes(_, __, { models }) {
      return models.Recipe.findAll();
    },
    async recipe(_, { id }, { models }) {
      return models.Recipe.findOne({
        where: {
          id
        }
      });
    }
  },
  Mutation: {
    async createUser(_, { name, email, password }, { models }) {
      return models.User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10)
      });
    },
    async createRecipe(
      _,
      { userId, title, ingredients, direction },
      { models }
    ) {
      return models.Recipe.create({ userId, title, ingredients, direction });
    }
  },
  User: {
    async recipes(user) {
      return user.getRecipes();
    }
  },
  Recipe: {
    async user(recipe) {
      return recipe.getUser();
    }
  }
};

module.exports = resolvers;
