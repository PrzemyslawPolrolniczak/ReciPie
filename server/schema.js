const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    recipies: [Recipie!]!
  }

  type Recipie {
    id: Int!
    title: String!
    ingredients: String!
    direction: String!
    user: User!
  }

  type Query {
    user(id: Int!): User
    allRecipies: [Recipie!]!
    recipie(id: Int!): Recipie
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createRecipie(
      userId: Int!
      title: String!
      ingredients: String!
      direction: String!
    ): Recipie!
  }
`;

module.exports = typeDefs;
