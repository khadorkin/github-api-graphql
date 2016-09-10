/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';
import fs from 'fs';
import runQuery from '../helpers/graphql_runner';
import { mockRepo } from '../helpers/mock';

chai.use(dirtyChai);

const query = `
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
  beforeEach(() => {
    mockRepo('rportugal/opencv-zbar');
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

    const expected = JSON.parse(fs.readFileSync('src/test/fixtures/expected/repository_query_test.json', 'utf8'));
    expect(result).to.deep.equal(expected);
  });
});
