/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';
import fs from 'fs';
import runQuery from '../helpers/graphql_runner';
import {
  mockRepo,
  mockIssuesRepo,
} from '../helpers/mock';

chai.use(dirtyChai);

const baseQuery = `
{
  repo(fullName: "rportugal/opencv-zbar") {
    id
    name
    full_name
    description
    private
    fork
    url
    html_url
    archive_url
    assignees_url
    blobs_url
    branches_url
    clone_url
    collaborators_url
    comments_url
    commits_url
    compare_url
    contents_url
    contributors_url
    downloads_url
    events_url
    forks_url
    git_commits_url
    git_refs_url
    git_tags_url
    git_url
    hooks_url
    issue_comment_url
    issue_events_url
    issues_url
    keys_url
    labels_url
    languages_url
    merges_url
    milestones_url
    mirror_url
    notifications_url
    pulls_url
    releases_url
    ssh_url
    stargazers_url
    statuses_url
    subscribers_url
    subscription_url
    svn_url
    tags_url
    teams_url
    trees_url
    homepage
    language
    forks_count
    stargazers_count
    watchers_count
    size
    default_branch
    open_issues_count
    has_issues
    has_wiki
    has_pages
    has_downloads
    pushed_at
    created_at
    updated_at
  }
}
`;

describe('Repository query', () => {
  before(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  // it('returns null if the user does not exist', async() => {
  //   const result = await runQuery(query);
  //   console.log(result);
  // });

  it('returns the base fields', async() => {
    mockRepo('rportugal/opencv-zbar');
    const result = await runQuery(baseQuery);
    expect(nock.isDone()).to.equal(true, "Didn't hit all mock endpoints!");

    const expected = JSON.parse(
      fs.readFileSync('src/test/fixtures/expected/repository_query_test.json', 'utf8'));
    expect(result).to.deep.equal(expected);
  });

  describe('Issues', () => {
    beforeEach(() => {
      mockRepo('graphql/express-graphql');
    });

    it.skip('returns the base fields', async() => {

    });

    describe('State argument', () => {
      it('returns the open issues by default', async() => {
        const query = `
        {
          repo(fullName: "graphql/express-graphql") {
            issues {
              id
              state
            }
          }
        }`;

        mockIssuesRepo('graphql/express-graphql');
        const result = await runQuery(query);
        expect(nock.isDone()).to.equal(true, "Didn't hit all the mock endpoints!");

        const expected = JSON.parse(
          fs.readFileSync('src/test/fixtures/expected/repository_query_test-issues--open.json',
                          'utf8'));
        expect(result).to.deep.equal(expected);
      });

      it('returns the open issues if passing OPEN', async() => {
        const query = `
        {
          repo(fullName: "graphql/express-graphql") {
            issues(state: OPEN) {
              id
              state
            }
          }
        }`;
        mockIssuesRepo('graphql/express-graphql', 'open');
        const result = await runQuery(query);
        expect(nock.isDone()).to.equal(true, "Didn't hit all the mock endpoints!");

        const expected = JSON.parse(
          fs.readFileSync('src/test/fixtures/expected/repository_query_test-issues--open.json',
                          'utf8'));
        expect(result).to.deep.equal(expected);
      });

      it('returns the closed issues if passing CLOSED', async() => {
        const query = `
        {
          repo(fullName: "graphql/express-graphql") {
            issues(state: CLOSED) {
              id
              state
            }
          }
        }`;
        mockIssuesRepo('graphql/express-graphql', 'closed');
        const result = await runQuery(query);
        expect(nock.isDone()).to.equal(true, "Didn't hit all the mock endpoints!");

        const expected = JSON.parse(
          fs.readFileSync('src/test/fixtures/expected/repository_query_test-issues--closed.json',
                          'utf8'));
        expect(result).to.deep.equal(expected);
      });

      it('returns all issues if passing ALL', async() => {
        const query = `
        {
          repo(fullName: "graphql/express-graphql") {
            issues(state: ALL) {
              id
              state
            }
          }
        }`;
        mockIssuesRepo('graphql/express-graphql', 'all');
        const result = await runQuery(query);
        expect(nock.isDone()).to.equal(true, "Didn't hit all the mock endpoints!");

        const expected = JSON.parse(
          fs.readFileSync('src/test/fixtures/expected/repository_query_test-issues--all.json',
            'utf8'));
        expect(result).to.deep.equal(expected);
      });
    });

    describe('Milestone argument', () => {
      it.skip('returns a milestone by number', async() => {

      });

      it.skip("returns any milestone if passing '*'", async() => {

      });

      it.skip("returns issues without milestones if passing 'none'", async() => {

      });
    });

    describe('Assignee argument', () => {
      it.skip('returns issues assigned to a user if passing the user name', async() => {

      });

      it.skip("returns issues with no assigned user if passing 'none'", async() => {

      });

      it.skip("returns issues with no assigned user if passing '*'", async() => {

      });
    });

    describe('Creator argument', () => {
      it.skip('returns issues created by a user', async() => {

      });
    });

    describe('Mentioned argument', () => {
      it.skip('returns issues where a user is mentioned', async() => {

      });
    });

    describe('Labels argument', () => {
      it.skip('returns based on a comma separated list of label names', async() => {

      });
    });

    describe('Sort argument', () => {
      it.skip('sorts by CREATED by default', async() => {

      });

      it.skip('sorts by created if passing CREATED', async() => {

      });

      it.skip('sorts by updated if passing UPDATED', async() => {

      });

      it.skip('sorts by comments if passing COMMENTS', async() => {

      });
    });

    describe('Direction argument', () => {
      it.skip('sorts issues in descending order by default', async() => {

      });

      it.skip('can sort issues in descending order', async() => {

      });

      it.skip('can sort issues in ascending order', async() => {

      });
    });

    describe('Since argument', () => {
      it.skip('returns issues updated at or after a date', async() => {

      });
    });
  });
});
