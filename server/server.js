const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const { recipie: schema } = require("./schema");
const models = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    context: { models },
    graphiql: true
  })
);

app.listen(PORT, () =>
  console.log(`App is listening on http://localhost:${PORT}`)
);
