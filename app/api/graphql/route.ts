import { createYoga, createSchema } from 'graphql-yoga'

const { handleRequest } = createYoga({
    graphqlEndpoint: '/api/graphql',
    schema: createSchema({
        typeDefs: `
type Query {
greetings: String
}
`,
        resolvers: {
            Query: {
                greetings: () => 'This is the `greetings` field of the root `Query` type',
            },
        },
    }),
    fetchAPI: {
        Response: Response,
        Request: Request,
    },
})

export async function GET(request: Request) {
    return handleRequest(request, {})
}

export async function POST(request: Request) {
    return handleRequest(request, {})
}