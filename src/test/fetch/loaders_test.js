import { expect } from 'chai';
import nock from 'nock';
import { GITHUB_BASE_URL } from '../../conf';
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
      nock(`${GITHUB_BASE_URL}`)
        .persist()
        .intercept(/users\/rportugal/, 'GET')
        .times(1)
        .replyWithFile(200, 'src/test/fixtures/user_valid.json');

      const userName = 'rportugal';
      const result = await loaders.users.load(userName);
      const expectedResult = JSON.parse(
        fs.readFileSync('src/test/fixtures/user_valid.json', 'utf8'));
      expect(result).to.deep.eq(expectedResult);
    });
  });

  describe('Repo loader', () => {
    it('is able to fetch a repo through the loader', async() => {
      nock(`${GITHUB_BASE_URL}`)
        .persist()
        .intercept(/repos\/rportugal\/opencv-zbar/, 'GET')
        .times(1)
        .replyWithFile(200, 'src/test/fixtures/repo_valid.json');

      const repo = 'rportugal/opencv-zbar';
      const result = await loaders.repos.load(repo);
      const expectedResult = JSON.parse(
        fs.readFileSync('src/test/fixtures/repo_valid.json', 'utf8'));
      expect(result).to.deep.eq(expectedResult);
    });
  });

  describe('Events loader', () => {

  });

  describe('Issues loader', () => {

  });
});
