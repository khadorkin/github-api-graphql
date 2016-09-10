/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';
import fs from 'fs';
import runQuery from '../helpers/graphql_runner';
import { mockUser, mockUserNotFound } from '../helpers/mock';

chai.use(dirtyChai);

const query = `
{
  user(userName: "rportugal") {
    login
    id
    avatar_url
    gravatar_id
    url
    html_url
    followers_url
    following_url
    gists_url
    starred_url
    subscriptions_url
    organizations_url
    repos_url
    events_url
    received_events_url
    type
    site_admin
    name
    company
    blog
    location
    email
    hireable
    bio
    public_repos
    public_gists
    num_followers
    num_following
    created_at
    updated_at
  }
}
`;

// const followersQuery = `
// {
//   user(userName: "rportugal") {
//     followers {
//       id
//     }
//   }
// }
// `;

// const followingQuery = `
// {
//   user(userName: "rportugal") {
//     following
//   }
// }
// `;

describe('User query', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('when the user does not exist', () => {
    beforeEach(() => {
      mockUserNotFound('rportugal');
    });

    it('returns null', async() => {
      const result = await runQuery(query);
      expect(result.errors[0].message).to.equal('Bad response from server');
      const user = result.data.user;
      expect(user).to.be.null();
    });
  });

  describe('when the user exists', () => {
    beforeEach(() => {
      mockUser('rportugal');
    });

    it('returns the base fields', async() =>{
      const result = await runQuery(query);

      const expected = JSON.parse(fs.readFileSync('src/test/fixtures/expected/user_query_test.json', 'utf8'));
      expect(result).to.deep.equal(expected);
    });

    // it('returns the list of followers', async() => {
    //   nock(`${GITHUB_BASE_URL}`)
    //     .persist()
    //     .intercept(/users\/rportugal\/followers/, 'GET')
    //     .times(1)
    //     .replyWithFile(200, 'src/test/fixtures/user_followers.json');
    //
    //   const result = await runQuery(followersQuery);
    //   console.log(result);
    //
    //   expect(nock.isDone()).to.equal(true, "Didn't hit all mock endpoints!");
    // });
  });
});
