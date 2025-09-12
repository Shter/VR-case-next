import { createYoga, createSchema } from "graphql-yoga";
import { NextRequest } from "next/server";
import offers from "@/app/data/pricing.json";

const typeDefs = /* GraphQL */ `
type Offer {
id: ID!
title: String!
headsets: Int!
period: String! # "2h" | "day" | "week"
price: Int!
plusPrice: Int
plusUnit: String
}

type Query {
offers(headsets: Int): [Offer!]!
}
`;

const resolvers = {
    Query: {
        offers: (_: unknown, args: { headsets?: number }) => {
            if (!args.headsets) return offers;
            return offers.filter(o => o.headsets === args.headsets);
        }
    }
};

const schema = createSchema<{ req: NextRequest }>({ typeDefs, resolvers });

export const { handleRequest } = createYoga<{ req: NextRequest }>({
    schema,
    context: ({ request }) => ({ req: request as NextRequest }),
    graphqlEndpoint: "/api/graphql",
});