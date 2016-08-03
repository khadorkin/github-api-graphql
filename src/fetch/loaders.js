import DataLoader from 'dataloader';
import restler from 'restler';
import { GITHUB_BASE_URL } from '../conf';

function getUser(userName: string): Object {
  return new Promise((resolve, reject) => {
    const url = `${GITHUB_BASE_URL}/users/${userName}`;

    restler.get(url).on('complete', (result) => {
      if (result instanceof Error) {
        console.log(`Error: ${result.message}`);
        // this.retry(5000);
        reject(result);
      } else resolve(result);
    });
  });
}

function getComments(repoUrl: string, accessToken: string): Object {
  return new Promise((resolve, reject) => {
    restler.get(repoUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).on('complete', (result) => {
      if (result instanceof Error) {
        console.log(`Error: ${result.message}`);
        reject(result);
      } else resolve(result);
    });
  });
}

export function getAuthenticatedUserRepos(accessToken) {
  return new Promise((resolve, reject) => {
    const url = `${GITHUB_BASE_URL}/user/repos`;

    restler.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).on('complete', (result) => {
      if (result instanceof Error) {
        console.log(`Error: ${result.error}`);
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}

export function getRepo(fullName) {
  return new Promise((resolve, reject) => {
    const url = `${GITHUB_BASE_URL}/repos/${fullName}`;

    restler.get(url).on('complete', (result) => {
      if (result instanceof Error) {
        console.log(`Error: ${result.error}`);
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}

export function createLoaders(/* authToken: string */): Object {
  return {
    users: new DataLoader(ids => Promise.all(ids.map(getUser))),
    repos: new DataLoader(ids => Promise.all(ids.map(getRepo))),
    // issues: new DataLoader(ids => Promise.all(ids.map(getIssue))),
    // pullRequests: new DataLoader(ids => Promise.all(ids.map(getPullRequest))),
    comments: new DataLoader(ids => Promise.all(ids.map(getComments))),
  };
}
