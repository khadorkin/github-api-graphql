import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import UserType from './user_type';
import RepositoryType from './repository_type';

import { User } from '../fetch/user';
import Repo from '../fetch/repo';

const queryType = new GraphQLObjectType({
  name: 'Root',
  fields: {
    // me: {
    //   type: UserType,
    //   resolve: (parentValue, _, { loaders/* , user, accessToken */ }) =>
    //     AuthenticatedUser.gen(loaders, 'rportugal'),
    // },
    user: {
      type: UserType,
      args: {
        userName: { type: GraphQLString },
      },
      resolve: (parentValue, { userName }, { loaders }) =>
        User.gen(loaders, userName),
    },
    repo: {
      type: RepositoryType,
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
