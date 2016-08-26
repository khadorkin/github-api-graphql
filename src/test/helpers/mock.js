import { GITHUB_BASE_URL } from '../../conf';
import nock from 'nock';

function fixRepoFullName(fullName) {
  return fullName.replace(/\//g, '--');
}

function mockReplyWithFilename(regex, filename) {
  nock(`${GITHUB_BASE_URL}`)
    .persist()
    .intercept(new RegExp(regex), 'GET')
    .times(1)
    .replyWithFile(200, filename);
}

export function mockUserNotFound(userName) {
  const regexStr = `users\/${userName}`;
  nock(`${GITHUB_BASE_URL}`)
    .persist()
    .intercept(new RegExp(regexStr), 'GET')
    .times(1)
    .replyWithFile(401, 'src/test/fixtures/user_not_found.json');
}

export function mockUser(userName) {
  const regexStr = `users\/${userName}`;
  const responseFilename = `src/test/fixtures/user_${userName}.json`;
  mockReplyWithFilename(regexStr, responseFilename);
  return responseFilename;
}

export function mockRepo(fullName) {
  const fullNameFixed = fixRepoFullName(fullName);
  const regexStr = `/repos/${fullName}`;
  const responseFilename = `src/test/fixtures/repo_${fullNameFixed}.json`;
  mockReplyWithFilename(regexStr, responseFilename);

  return responseFilename;
}

export function mockRepoEvents(fullName) {
  const fullNameFixed = fixRepoFullName(fullName);
  const regexStr = `/repos/${fullName}/issues/events`;
  const responseFilename = `src/test/fixtures/issues_repo_events_${fullNameFixed}.json`;
  mockReplyWithFilename(regexStr, responseFilename);

  return responseFilename;
}

export function mockPullRequestsRepo(fullName) {
  const fullNameFixed = fixRepoFullName(fullName);
  const regexStr = `/repos/${fullName}/pulls`;
  const responseFilename = `src/test/fixtures/pull_requests_repo_${fullNameFixed}.json`;
  mockReplyWithFilename(regexStr, responseFilename);

  return responseFilename;
}
