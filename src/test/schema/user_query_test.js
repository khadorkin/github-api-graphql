import { runQuery } from '../helpers/graphql_runner';
import { expect } from 'chai';
import nock from 'nock';
import { GITHUB_BASE_URL } from '../../conf';

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

describe('User query', () => {
  beforeEach(() => {
    // nock.disableNetConnect();
    nock(`${GITHUB_BASE_URL}`)
      .persist()
      .intercept(/users\/rportugal/, 'GET')
      .times(1)
      .replyWithFile(200, 'src/test/fixtures/user_valid.json');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  // it('returns null if the user does not exist', async() => {
  //   const result = await runQuery(query);
  //   console.log(result);
  // });

  it('returns the base fields', async() => {
    const result = await runQuery(query);
    console.log(result);

    expect(nock.isDone()).to.equal(true, "Didn't hit all mock endpoints!");
    const user = result.data.user;
    expect(user.login).to.equal('rportugal');
    expect(user.id).to.equal(784082);
    expect(user.avatar_url).to.equal('https://avatars.githubusercontent.com/u/784082?v=3');
    expect(user.gravatar_id).to.equal('');
    expect(user.url).to.equal('https://api.github.com/users/rportugal');
    expect(user.html_url).to.equal('https://github.com/rportugal');
    expect(user.followers_url).to.equal('https://api.github.com/users/rportugal/followers');
    expect(user.following_url).to.equal('https://api.github.com/users/rportugal/following{/other_user}');
    expect(user.gists_url).to.equal('https://api.github.com/users/rportugal/gists{/gist_id}');
    expect(user.starred_url).to.equal('https://api.github.com/users/rportugal/starred{/owner}{/repo}');
    expect(user.subscriptions_url).to.equal('https://api.github.com/users/rportugal/subscriptions');
    expect(user.organizations_url).to.equal('https://api.github.com/users/rportugal/orgs');
    expect(user.repos_url).to.equal('https://api.github.com/users/rportugal/repos');
    expect(user.events_url).to.equal('https://api.github.com/users/rportugal/events{/privacy}');
    expect(user.received_events_url).to.equal('https://api.github.com/users/rportugal/received_events');
    expect(user.type).to.equal('User');
    expect(user.site_admin).to.equal(false);
    expect(user.name).to.equal('Ricardo Portugal');
    expect(user.company).to.equal('@sky-uk ');
    expect(user.blog).to.equal(null);
    expect(user.location).to.equal('London, United Kingdom');
    expect(user.email).to.equal(null);
    expect(user.hireable).to.equal(true);
    expect(user.bio).to.equal(null);
    expect(user.public_repos).to.equal(24);
    expect(user.public_gists).to.equal(4);
    expect(user.num_followers).to.equal(24);
    expect(user.num_following).to.equal(22);
    expect(user.created_at).to.equal('2011-05-12T15:14:20Z');
    expect(user.updated_at).to.equal('2016-08-12T12:49:11Z');
  });
});
