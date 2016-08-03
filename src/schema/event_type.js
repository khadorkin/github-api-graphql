import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
} from 'graphql';

export const eventType = new GraphQLObjectType({
  name: 'Event',
  fields: {
    type: { type: GraphQLString },
    public: { type: GraphQLBoolean },
    created_at: { type: GraphQLString },
    id: { type: GraphQLString },
  },
});
