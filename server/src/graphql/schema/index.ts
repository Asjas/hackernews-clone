const gql = String.raw;

const schema = gql`
  enum Sort {
    asc
    desc
  }

  input LinkOrderByInput {
    description: Sort
    url: Sort
    createdAt: Sort
  }

  type Query {
    info: String!
    feed(filter: String, skip: Int, take: Int, orderBy: LinkOrderByInput): Feed!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    vote(linkId: ID!): Vote
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    postedBy: User
    votes: [Vote!]!
  }

  type Feed {
    links: [Link!]!
    count: Int!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link!]!
  }

  type Vote {
    id: ID!
    link: Link!
    user: User!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Subscription {
    newLink: Link
    newVote: Vote
  }
`;

export default schema;
