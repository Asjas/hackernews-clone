const Koa = require('koa');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-koa');
const { Prisma } = require('prisma-binding');
const { importSchema } = require('graphql-import');

const typeDefs = importSchema(`${__dirname}/schema.graphql`);
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

require('dotenv').config({ path: `${__dirname}/.env` });

const { PRISMA_ENDPOINT, PRISMA_SECRET } = process.env;

const db = new Prisma({
  typeDefs: `${__dirname}/generated/prisma.graphql`,
  endpoint: PRISMA_ENDPOINT,
  secret: PRISMA_SECRET,
});

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  playground: {
    settings: {
      'editor.cursorShape': 'underline',
      'editor.fontFamily': "'Operator Mono', 'Source Code Pro', 'Consolas', 'Inconsolata'",
      'editor.fontSize': '16',
      'prettier.printWidth': 100,
    },
  },
  context: req => ({ ...req, db }),
});

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`✔️ Server ready at http://localhost:4000${server.graphqlPath}`),
);
