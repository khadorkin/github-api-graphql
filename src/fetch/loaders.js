import DataLoader from 'dataloader';
import rp from 'request-promise-native';
import GITHUB_BASE_URL from '../conf';

function getUrl(url) {
  return new Promise((resolve, reject) =>
    rp({
      uri: url,
      headers: {
        'User-Agent': 'request',
      },
    })
      .then(result => resolve(JSON.parse(result)))
      .catch(err => {
        // console.log(err);
        reject('Bad response from server');
      })
  );
}
function getPath(path) {
  return getUrl(`${GITHUB_BASE_URL}/${path}`);
}

function getRepo(fullName) {
  return getPath(`repos/${fullName}`);
}

function getUser(userName: string): Object {
  return getPath(`users/${userName}`);
}

function getRepoEvents(fullName) {
  return getPath(`repos/${fullName}/issues/events`);
}

function getRepoBranches(fullName) {
  return getPath(`repos/${fullName}/branches`);
}

function getRepoIssues(fullName) {
  return getPath(`repos/${fullName}/issues`);
}

function getPullRequestsRepo(fullName) {
  return getPath(`repos/${fullName}/pulls`);
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

export default function createLoaders(/* authToken: string */): Object {
  return {
    users: new DataLoader(ids => Promise.all(ids.map(getUser))),
    repos: new DataLoader(ids => Promise.all(ids.map(getRepo))),
    repoEvents: new DataLoader(ids => Promise.all(ids.map(getRepoEvents))),
    repoBranches: new DataLoader(ids => Promise.all(ids.map(getRepoBranches))),
    repoIssues: new DataLoader(ids => Promise.all(ids.map(getRepoIssues))),
    // issues: new DataLoader(ids => Promise.all(ids.map(getIssue))),
    pullRequestsRepo: new DataLoader(ids => Promise.all(ids.map(getPullRequestsRepo))),
    // comments: new DataLoader(ids => Promise.all(ids.map(getComments))),
  };
}
