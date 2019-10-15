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
    async allRecipies(_, __, { models }) {
      return models.Recipie.findAll();
    },
    async recipie(_, { id }, { models }) {
      return models.Recipie.findOne({
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
    async createRecipie(
      _,
      { userId, title, ingredients, direction },
      { models }
    ) {
      return models.Recipie.create({ userId, title, ingredients, direction });
    }
  },
  User: {
    async recipies(user) {
      return user.getRecipies();
    }
  },
  Recipie: {
    async user(recipie) {
      return recipie.getUser();
    }
  }
};

module.exports = resolvers;
