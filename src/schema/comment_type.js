import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import restler from 'restler';

export const GHCommentType = new GraphQLObjectType({
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

export function getComments(repoUrl, accessToken) {
  return new Promise((resolve, reject) => {
    restler.get(repoUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).on('complete', (result) => {
      if (result instanceof Error) {
        console.log(`Error: ${result.message}`);
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}
