const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () =>
  console.log(`App is listening on http://localhost:${PORT}`)
);
