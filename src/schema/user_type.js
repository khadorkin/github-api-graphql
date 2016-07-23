import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import restler from 'restler';
import { GITHUB_BASE_URL } from './conf';

import {
  GHRepositoryType,
  getAuthenticatedUserRepos,
} from './repository_type';

import {
  getFromURL,
} from './get_helper';

export const GHUserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    login: { type: GraphQLString },
    id: { type: GraphQLInt },
    avatar_url: { type: GraphQLString },
    gravatar_id: { type: GraphQLString },
    url: { type: GraphQLString },
    html_url: { type: GraphQLString },
    followers_url: { type: GraphQLString },
    following_url: { type: GraphQLString },
    gists_url: { type: GraphQLString },
    starred_url: { type: GraphQLString },
    subscriptions_url: { type: GraphQLString },
    organizations_url: { type: GraphQLString },
    repos_url: { type: GraphQLString },
    repos: {
      type: new GraphQLList(GHRepositoryType),
      resolve: (parentValue, _, { rootValue: { user } }) =>
        getAuthenticatedUserRepos(user.accessToken),
    },
    events_url: { type: GraphQLString },
    received_events_url: { type: GraphQLString },
    type: { type: GraphQLString },
    site_admin: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    company: { type: GraphQLString },
    blog: { type: GraphQLString },
    location: { type: GraphQLString },
    email: { type: GraphQLString },
    hireable: { type: GraphQLBoolean },
    bio: { type: GraphQLString },
    public_repos: { type: GraphQLInt },
    public_gists: { type: GraphQLInt },
    num_followers: {
      type: GraphQLInt,
      resolve: parentValue => parentValue.followers,
    },
    num_following: {
      type: GraphQLInt,
      resolve: parentValue => parentValue.following,
    },
    followers: {
      type: new GraphQLList(GHUserType),
      resolve: parentValue => getFromURL(parentValue.followers_url),
    },
    following: {
      type: new GraphQLList(GHUserType),
      resolve: parentValue => getFromURL(parentValue.following_url),
    },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    // /issues
  }),
});

export function getUser(userName) {
  return new Promise((resolve, reject) => {
    const url = `${GITHUB_BASE_URL}/users/${userName}`;

    restler.get(url).on('complete', (result) => {
      if (result instanceof Error) {
        console.log(`Error: ${result.message}`);
        // this.retry(5000);
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}

/*
export function getAuthenticatedUser(accessToken) {
  return new Promise((resolve, reject) => {
    let url = `${GITHUB_BASE_URL}/user`

    restler.get(url, {
      headers: { "Authorization": `Bearer ${accessToken}`}
    }).on('complete', (result) => {
      if (result instanceof Error) {
        console.log(`Error: ${result.message}`);
        reject(result);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
}
*/
