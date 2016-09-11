import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import GHUserType from './user_type';
import GHRepositoryType from './repository_type';

import { User } from '../fetch/user';
import Repo from '../fetch/repo';

const queryType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    // me: {
    //   type: GHUserType,
    //   resolve: (parentValue, _, { loaders/* , user, accessToken */ }) =>
    //     AuthenticatedUser.gen(loaders, 'rportugal'),
    // },
    user: {
      type: GHUserType,
      args: {
        userName: { type: GraphQLString },
      },
      resolve: (parentValue, { userName }, { loaders }) =>
        User.gen(loaders, userName),
    },
    repo: {
      type: GHRepositoryType,
      args: {
        fullName: { type: GraphQLString },
      },
      resolve: (parentValue, { fullName }, { loaders }) =>
        Repo.gen(loaders, fullName),
    },
  },
});

export default new GraphQLSchema({
  query: queryType,
});
