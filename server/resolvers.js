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
      const existingUser =
        (await models.User.findOne({
          where: {
            name
          }
        })) ||
        (await models.User.findOne({
          where: {
            email
          }
        }));

      if (existingUser && !existingUser.isNewRecord) {
        return { err: "Username or email is already taken", token: null };
      } else {
        models.User.create({
          name,
          email,
          password: await bcrypt.hash(password, 10)
        });

        return { err: null, token: `AuthenticatedUser${name}` };
      }
    },
    async loginUser(_, { name, password }, { models }) {
      const user = await models.User.findOne({
        where: {
          name
        }
      });

      if (!user) return { err: "There is no such user", token: null };

      const {
        dataValues: { password: pwd }
      } = user;

      const result = await new Promise((resolve, reject) => {
        bcrypt.compare(password, pwd, (err, res) => {
          if (err) {
            reject({ err, token: null });
          }
          if (res) {
            resolve({ err: null, token: `AuthenticatedUser${name}` });
          } else {
            resolve({ err: "Pass don't match", token: null });
          }
        });
      });

      return result;
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
