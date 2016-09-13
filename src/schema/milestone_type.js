import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Milestone',
  fields: {
    url: { type: GraphQLString },
    html_url: { type: GraphQLString },
    labels_url: { type: GraphQLString },
    id: { type: GraphQLInt },
    number: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    // creator: { type: CreatorType },
    open_issues: { type: GraphQLInt },
    closed_issues: { type: GraphQLInt },
    state: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    due_on: { type: GraphQLString },
    closed_at: { type: GraphQLString },
  },
});
