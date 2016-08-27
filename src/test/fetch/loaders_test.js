import { expect } from 'chai';
import nock from 'nock';
import {
  mockUser,
  mockRepo,
  mockRepoEvents,
  mockPullRequestsRepo,
} from '../helpers/mock';
import { createLoaders } from '../../fetch/loaders';
import fs from 'fs';

function loadExpectedResult(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

describe('Loaders', () => {
  let loaders;

  beforeEach(() => {
    nock.disableNetConnect();
    loaders = createLoaders();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('User', () => {
    it('is able to fetch a user through the loader', async() => {
      const userName = 'rportugal';
      const filename = mockUser(userName);
      const result = await loaders.users.load(userName);
      const expectedResult = loadExpectedResult(filename);
      expect(result).to.deep.eq(expectedResult);
    });
  });

  describe('Repository', () => {
    it('is able to fetch a repo through the loader', async() => {
      const fullName = 'rportugal/opencv-zbar';
      const filename = mockRepo(fullName);
      const result = await loaders.repos.load(fullName);
      const expectedResult = loadExpectedResult(filename);
      expect(result).to.deep.eq(expectedResult);
    });
  });

  describe('Repository Events', () => {
    it('is able to fetch a repository event through the loader', async() => {
      const fullName = 'graphql/express-graphql';
      const filename = mockRepoEvents(fullName);
      const result = await loaders.repoEvents.load(fullName);
      const expectedResult = loadExpectedResult(filename);
      expect(result).to.deep.eq(expectedResult);
    });
  });

  describe('Pull Requests for Repository', () => {
    it('is able to fetch the pull requests for a repository through the loader', async() => {
      const fullName = 'graphql/express-graphql';
      const filename = mockPullRequestsRepo(fullName);
      const result = await loaders.pullRequestsRepo.load(fullName);
      const expectedResult = loadExpectedResult(filename);
      expect(result).to.deep.eq(expectedResult);
    });
  });

  describe('Issues', () => {

  });
});
