import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { detokenizeUser } from './utils/tokenizer'

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            // try to retrieve a user with the token
            const user = detokenizeUser(req);

            // add the user to the context
            return { user };
        },
    });

    const app = express();
    server.applyMiddleware({ app });

    await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen({ port: 3000 }, () =>
        console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
    );
}

startServer();