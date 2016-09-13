/* eslint-disable import/no-extraneous-dependencies */
import nock from 'nock';
import GITHUB_BASE_URL from '../../conf';

function fixRepoFullName(fullName) {
  return fullName.replace(/\//g, '--');
}

function mockReplyWithFilename(regex, filename, queryParams = {}) {
  const interceptor = nock(`${GITHUB_BASE_URL}`)
    .persist()
    .intercept(new RegExp(regex), 'GET')
    .times(1);

  interceptor.query(queryParams);
  interceptor.replyWithFile(200, filename);
}

export function mockUserNotFound(userName) {
  const regexStr = `\/users\/${userName}`;
  nock(`${GITHUB_BASE_URL}`)
    .persist()
    .intercept(new RegExp(regexStr), 'GET')
    .times(1)
    .replyWithFile(401, 'src/test/fixtures/user_not_found.json');
}

export function mockUser(userName) {
  const regexStr = `\/users\/${userName}`;
  const responseFilename = `src/test/fixtures/user_${userName}.json`;
  mockReplyWithFilename(regexStr, responseFilename);
  return responseFilename;
}

export function mockRepo(fullName) {
  const fullNameFixed = fixRepoFullName(fullName);
  const regexStr = `\/repos\/${fullName}$`;
  const responseFilename = `src/test/fixtures/repo_${fullNameFixed}.json`;
  mockReplyWithFilename(regexStr, responseFilename);

  return responseFilename;
}

export function mockRepoEvents(fullName) {
  const fullNameFixed = fixRepoFullName(fullName);
  const regexStr = `\/repos\/${fullName}\/issues\/events`;
  const responseFilename = `src/test/fixtures/issues_repo_events_${fullNameFixed}.json`;
  mockReplyWithFilename(regexStr, responseFilename);

  return responseFilename;
}

export function mockRepoBranches(fullName) {
  const fullNameFixed = fixRepoFullName(fullName);
  const regexStr = `\/repos\/${fullName}\/branches`;
  const responseFilename = `src/test/fixtures/repo_branches_${fullNameFixed}.json`;
  mockReplyWithFilename(regexStr, responseFilename);

  return responseFilename;
}

export function mockIssuesRepo(fullName, modifier = 'open') {
  const fullNameFixed = fixRepoFullName(fullName);
  const regexStr = `\/repos\/${fullName}\/issues`;
  const queryParams = {};
  let suffix = '';
  if (modifier) {
    suffix = `--${modifier}`;
    queryParams.state = modifier;
  }
  const filename = `src/test/fixtures/issues_repo_${fullNameFixed}${suffix}.json`;
  mockReplyWithFilename(regexStr, filename, queryParams);

  return filename;
}

export function mockPullRequestsRepo(fullName) {
  const fullNameFixed = fixRepoFullName(fullName);
  const regexStr = `/repos/${fullName}/pulls`;
  const responseFilename = `src/test/fixtures/pull_requests_repo_${fullNameFixed}.json`;
  mockReplyWithFilename(regexStr, responseFilename);

  return responseFilename;
}
