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
    expect(nock.isDone()).to.equal(true, "Didn't hit all mock endpoints!");

    const user = result.data.user;
    expect(user.login).to.equal('rportugal');
    expect(user.id).to.equal(784082);
    expect(user.avatar_url).to.equal('https://avatars.githubusercontent.com/u/784082?v=3');
    expect(user.gravatar_id).to.equal('');
    expect(user.url).to.equal('https://api.github.com/users/rportugal');
  });
});
