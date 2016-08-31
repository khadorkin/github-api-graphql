import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const GHCommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    html_url: { type: GraphQLString },
    url: { type: GraphQLString },
    id: { type: GraphQLInt },
    body: { type: GraphQLString },
    path: { type: GraphQLString },
    position: { type: GraphQLInt },
    line: { type: GraphQLInt },
    commit_id: { type: GraphQLString },
  },
});

export default GHCommentType;
