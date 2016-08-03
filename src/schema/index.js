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

import { User, AuthenticatedUser } from '../fetch/user';
import { Repo } from '../fetch/repo';

const queryType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    me: {
      type: GHUserType,
      resolve: (parentValue, _, { loaders/* , user, accessToken */ }) =>
        AuthenticatedUser.gen(loaders, 'rportugal'),
    },
    user: {
      type: GHUserType,
      args: {
        userName: { type: GraphQLString },
      },
      resolve: (parentValue, { userName }, { rootValue: { loaders } }) =>
        User.gen(loaders, userName),
    },
    repo: {
      type: GHRepositoryType,
      args: {
        fullName: { type: GraphQLString },
      },
      resolve: (parentValue, { fullName }, { rootValue: { loaders } }) =>
        Repo.gen(loaders, fullName),
    },
  },
});

export default new GraphQLSchema({
  query: queryType,
});
