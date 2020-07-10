import { Lead } from "./models/Lead";

//// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    say_hello: () => "Hi, I'm a robot",
    leads: () => Lead.find()
  }
};