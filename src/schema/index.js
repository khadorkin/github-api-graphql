import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  GHUserType,
} from './user_type';

import {
  GHRepositoryType,
} from './repository_type';

const queryType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    me: {
      type: GHUserType,
      resolve: (parentValue, _, { rootValue: { user, accessToken } } ) => {
        // return getAuthenticatedUser(user.accessToken);
        console.log(accessToken);
        // return user.profile._json;
      },
    },
    user: {
      type: GHUserType,
      args: {
        userName: { type: GraphQLString },
      },
      resolve: (parentValue, { userName }) => {
        console.log(userName);
        // return getUser(userName);
      },
    },
    repo: {
      type: GHRepositoryType,
      args: {
        fullName: { type: GraphQLString },
      },
      resolve: (parentValue, { fullName }) => {
        // return getRepo(fullName);
      },
    },
  },
});

export default new GraphQLSchema({
  query: queryType
});
