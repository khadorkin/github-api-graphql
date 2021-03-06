/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import nock from 'nock';
import fs from 'fs';
import {
  mockUser,
  mockRepo,
  mockRepoEvents,
  mockPullRequestsRepo,
  mockRepoBranches,
  mockIssuesRepo,
} from '../helpers/mock';
import createLoaders from '../../fetch/loaders';

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

  describe('Activity APIs', () => {
    describe('Events API', async() => {
      it.skip('is able to list public events', async() => {

      });

      it.skip('is able to list issue events for a repository', async() => {

      });

      it.skip('is able to list public events for a network of repositories', async() => {

      });
    });
  });

  describe('Users APIs', () => {
    describe('Single user', () => {
      it('is able to fetch a user through the loader', async() => {
        const userName = 'rportugal';
        const filename = mockUser(userName);
        const result = await loaders.users.load(userName);
        const expectedResult = loadExpectedResult(filename);
        expect(result).to.deep.eq(expectedResult);
      });
    });

    describe('Authenticated user', () => {
      it.skip('is able to fetch the authenticated user through the loader', async() => {

      });
    });

    describe('All users', () => {
      it.skip('is able to get all users through the loader', async() => {

      });
    });
  });

  describe('Repositories APIs', () => {
    describe('Branches', () => {
      describe('List branches', () => {
        it.skip('is able to fetch the list of branches for a repo through the loader', async() => {
          const fullName = 'graphql/graphql-js';
          const filename = mockRepoBranches(fullName);
          const result = await loaders.repoBranches.load(fullName);
          const expectedResult = loadExpectedResult(filename);
          expect(result).to.deep.eq(expectedResult);
        });
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
  });

  describe('Repository Events', () => {
    it('is able to fetch repository events through the loader', async() => {
      const fullName = 'graphql/express-graphql';
      const filename = mockRepoEvents(fullName);
      const result = await loaders.repoEvents.load(fullName);
      const expectedResult = loadExpectedResult(filename);
      expect(result).to.deep.eq(expectedResult);
    });
  });

  describe('Pull Requests APIs', () => {
    describe('Pull Requests for Repository', () => {
      it('is able to fetch the pull requests for a repository through the loader', async() => {
        const fullName = 'graphql/express-graphql';
        const filename = mockPullRequestsRepo(fullName);
        const result = await loaders.pullRequestsRepo.load(fullName);
        const expectedResult = loadExpectedResult(filename);
        expect(result).to.deep.eq(expectedResult);
      });
    });
  });

  describe('Issues', () => {
    describe('Issues for a Repository', () => {
      it('is able to fetch the issues for a repository through the loader', async() => {
        const repoFullName = 'graphql/express-graphql';
        const filename = mockIssuesRepo(repoFullName);
        const result = await loaders.repoIssues.load({ fullName: repoFullName, state: 'open' });
        const expectedResult = loadExpectedResult(filename);
        expect(result).to.deep.eq(expectedResult);
      });
    });
  });

  describe('Organizations APIs', () => {
    describe('User organizations', () => {

    });
  });
});
