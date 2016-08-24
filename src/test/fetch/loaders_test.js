import { expect } from 'chai';
import nock from 'nock';
import { mockUser, mockRepo } from '../helpers/mock';
import { createLoaders } from '../../fetch/loaders';
import fs from 'fs';

// import dotenv from 'dotenv';
// dotenv.config({ path: '.env.test', silent: true });
// dotenv.load();

describe('Loaders', () => {
  let loaders;

  beforeEach(() => {
    loaders = createLoaders();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('User loader', () => {
    it('is able to fetch a user through the loader', async() => {
      const userName = 'rportugal';
      const filename = mockUser(userName);
      const result = await loaders.users.load(userName);
      const expectedResult = JSON.parse(fs.readFileSync(filename, 'utf8'));
      expect(result).to.deep.eq(expectedResult);
    });
  });

  describe('Repo loader', () => {
    it('is able to fetch a repo through the loader', async() => {
      const repo = 'rportugal/opencv-zbar';
      const filename = mockRepo(repo);
      const result = await loaders.repos.load(repo);
      const expectedResult = JSON.parse(fs.readFileSync(filename, 'utf8'));
      expect(result).to.deep.eq(expectedResult);
    });
  });

  describe('Events loader', () => {

  });

  describe('Issues loader', () => {

  });
});
