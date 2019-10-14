const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} = require("graphql");
const axios = require("axios");

// SCHEMA
const LaunchType = new GraphQLObjectType({
  name: "LaunchType",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

const RocketType = new GraphQLObjectType({
  name: "RocketType",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    recipes: { type: new GraphQLList(RecipeType) }
  })
});

const RecipeType = new GraphQLObjectType({
  name: "RecipeType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    direction: { type: GraphQLString },
    user: { type: UserType }
  })
});

// RESOLVERS
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      async resolve(parent, args) {
        const { data } = await axios.get(
          "https://api.spacexdata.com/v3/launches"
        );
        return data;
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLID }
      },
      async resolve(parent, args) {
        const { data } = await axios.get(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        );
        return data;
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      async resolve(parent, args) {
        const { data } = await axios.get(
          "https://api.spacexdata.com/v3/rockets"
        );
        return data;
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const { data } = await axios.get(
          `https://api.spacexdata.com/v3/rockets/${args.id}`
        );
        return data;
      }
    }
  }
});

const RecipieQuery = new GraphQLObjectType({
  name: "RecipieQuery",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      async resolve(_, args, { models }) {
        return models.User.findById(args.id);
      }
    },
    allRecipes: {
      type: new GraphQLList(RecipeType),
      async resolve(_, __, { models }) {
        return models.Recipe.findAll();
      }
    }
  }
});

// MUTATIONS

const RecipieMutations = new GraphQLObjectType({
  name: "RecipieMutations",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(_, args, { models }) {
        const { name, email, password } = args;

        return models.User.create({
          name,
          email,
          password
        });
      }
    },
    createRecipe: {
      type: RecipeType,
      args: {
        userId: { type: GraphQLID },
        title: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        direction: { type: GraphQLString }
      },
      async resolve(_, args, { models }) {
        const { userId, title, ingredients, direction } = args;

        return models.Recipe.create({
          userId,
          title,
          ingredients,
          direction
        });
      }
    }
  }
});

module.exports.test = new GraphQLSchema({
  query: RootQuery
});

module.exports.recipie = new GraphQLSchema({
  query: RecipieQuery,
  mutation: RecipieMutations
});
