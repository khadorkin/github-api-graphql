import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Issue',
  fields: {
    id: { type: GraphQLInt },
    url: { type: GraphQLString },
    repository_url: { type: GraphQLString },
    labels_url: { type: GraphQLString },
    comments_url: { type: GraphQLString },
    events_url: { type: GraphQLString },
    html_url: { type: GraphQLString },
    number: { type: GraphQLInt },
    state: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    // user
    // labels
    // assignee
    // milestone
    locked: { type: GraphQLBoolean },
    comments: { type: GraphQLInt },
    // pull_request
    closed_at: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
});
