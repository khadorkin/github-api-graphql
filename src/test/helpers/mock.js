import { GITHUB_BASE_URL } from '../../conf';
import nock from 'nock';

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

  nock(`${GITHUB_BASE_URL}`)
    .persist()
    .intercept(new RegExp(regexStr), 'GET')
    .times(1)
    .replyWithFile(200, responseFilename);

  return responseFilename;
}

export function mockRepo(fullName) {
  const fullNameFixed = fullName.replace(/\//g, '--');
  const regexStr = `/repos/${fullName}`;
  const responseFilename = `src/test/fixtures/repo_${fullNameFixed}.json`;
  nock(`${GITHUB_BASE_URL}`)
    .persist()
    .intercept(new RegExp(regexStr), 'GET')
    .times(1)
    .replyWithFile(200, responseFilename);

  return responseFilename;
}
