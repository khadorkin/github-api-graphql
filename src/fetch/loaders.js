import DataLoader from 'dataloader';
import fetch from 'isomorphic-fetch';
import { GITHUB_BASE_URL } from '../conf';

export function getPath(path) {
  return new Promise((resolve, reject) => {
    const url = `${GITHUB_BASE_URL}/${path}`;

    fetch(url, {
      method: 'get'
    })
      .then(function(response) {
        if (response.status >= 400) {
          reject("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        resolve(data);
      });
  });
}

export function getRepo(fullName) {
  return getPath(`/repos/${fullName}`);
}

function getUser(userName: string): Object {
  return getPath(`/users/${userName}`);
}

// function getComments(repoUrl: string, accessToken: string): Object {
//   return new Promise((resolve, reject) => {
//     restler.get(repoUrl, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     }).on('complete', (result) => {
//       if (result instanceof Error) {
//         console.log(`Error: ${result.message}`);
//         reject(result);
//       } else resolve(result);
//     });
//   });
// }

export function createLoaders(/* authToken: string */): Object {
  return {
    users: new DataLoader(ids => Promise.all(ids.map(getUser))),
    repos: new DataLoader(ids => Promise.all(ids.map(getRepo))),
    // issues: new DataLoader(ids => Promise.all(ids.map(getIssue))),
    // pullRequests: new DataLoader(ids => Promise.all(ids.map(getPullRequest))),
    comments: new DataLoader(ids => Promise.all(ids.map(getComments))),
  };
}
