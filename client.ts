import { GraphQLClient } from "graphql-request";

export const HygraphClient = new GraphQLClient(
  process.env.HYGRAPH_ENDPOINT as string,
  {
    fetch,
  }
);
