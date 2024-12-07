import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";

export const HygraphClient = new ApolloClient({
  uri: process.env.HYGRAPH_ENDPOINT as string,
  cache: new InMemoryCache(),
});
