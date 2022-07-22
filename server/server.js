// express and database
const express = require("express");

// import apollo server
const { ApolloServer } = require("apollo-server-express");

// impor typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// port and app
const PORT = process.env.PORT || 3001;

const { authMiddleware } = require("./utils/auth");

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   // ? add context for headers --> allows jWT headers auth
//   context: ({ req }) => req.headers,
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create a new instance of Apollo server with GraphQl schema
const startApolloServer = async (TypeDefs, resolvers) => {
  await server.start();

  // integrate our Apollo server with the Express application as middle ware
  server.applyMiddleware({ app });
};

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can to test our GQL API

    console.log(`Use GraphQl at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
