import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

import {
  GHUserType,
  getUser,
  getAuthenticatedUser
} from "./user_type";

import {
  GHRepositoryType,
  getRepo
} from "./repository_type";

var queryType = new GraphQLObjectType({
  name: "Root",
  fields: {
    me: {
      type: GHUserType,
      resolve: (parentValue, _, { rootValue: { user, accessToken } } ) => {
        // return getAuthenticatedUser(user.accessToken);
        return user.profile._json;
      }
    },
    user: {
      type: GHUserType,
      args: {
        userName: {type: GraphQLString}
      },
      resolve: (parentValue, {userName}) => {
        return getUser(userName);
      }
    },
    repo: {
      type: GHRepositoryType,
      args: {
        fullName: {type: GraphQLString}
      },
      resolve: (parentValue, {fullName}) => {
        return getRepo(fullName);
      }
    }
  }
});

export default new GraphQLSchema({
  query: queryType
});
