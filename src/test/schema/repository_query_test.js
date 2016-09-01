/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';
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

    const repo = result.data.repo;
    expect(repo.id).to.equal(7981476);
    expect(repo.name).to.equal('opencv-zbar');
    expect(repo.full_name).to.equal('rportugal/opencv-zbar');
    expect(repo.description).to.equal('Barcode and QR Code reader using OpenCV and ZBar');
    expect(repo.private).to.equal(false);
    expect(repo.fork).to.equal(false);
    expect(repo.url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar');
    expect(repo.html_url).to.equal('https://github.com/rportugal/opencv-zbar');
    expect(repo.archive_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/{archive_format}{/ref}');
    expect(repo.assignees_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/assignees{/user}');
    expect(repo.blobs_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/git/blobs{/sha}');
    expect(repo.branches_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/branches{/branch}');
    expect(repo.clone_url).to.equal('https://github.com/rportugal/opencv-zbar.git');
    expect(repo.collaborators_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/collaborators{/collaborator}');
    expect(repo.comments_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/comments{/number}');
    expect(repo.commits_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/commits{/sha}');
    expect(repo.compare_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/compare/{base}...{head}');
    expect(repo.contents_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/contents/{+path}');
    expect(repo.contributors_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/contributors');
    expect(repo.downloads_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/downloads');
    expect(repo.events_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/events');
    expect(repo.forks_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/forks');
    expect(repo.git_commits_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/git/commits{/sha}');
    expect(repo.git_refs_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/git/refs{/sha}');
    expect(repo.git_tags_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/git/tags{/sha}');
    expect(repo.git_url).to.equal('git://github.com/rportugal/opencv-zbar.git');
    expect(repo.hooks_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/hooks');
    expect(repo.issue_comment_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/issues/comments{/number}');
    expect(repo.issue_events_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/issues/events{/number}');
    expect(repo.issues_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/issues{/number}');
    expect(repo.keys_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/keys{/key_id}');
    expect(repo.labels_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/labels{/name}');
    expect(repo.languages_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/languages');
    expect(repo.merges_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/merges');
    expect(repo.milestones_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/milestones{/number}');
    expect(repo.mirror_url).to.be.null();
    expect(repo.notifications_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/notifications{?since,all,participating}');
    expect(repo.pulls_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/pulls{/number}');
    expect(repo.releases_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/releases{/id}');
    expect(repo.ssh_url).to.equal('git@github.com:rportugal/opencv-zbar.git');
    expect(repo.stargazers_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/stargazers');
    expect(repo.statuses_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/statuses/{sha}');
    expect(repo.subscribers_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/subscribers');
    expect(repo.subscription_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/subscription');
    expect(repo.svn_url).to.equal('https://github.com/rportugal/opencv-zbar');
    expect(repo.tags_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/tags');
    expect(repo.teams_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/teams');
    expect(repo.trees_url).to.equal('https://api.github.com/repos/rportugal/opencv-zbar/git/trees{/sha}');
    expect(repo.homepage).to.be.null();
    expect(repo.language).to.equal('C++');
    expect(repo.forks_count).to.equal(7);
    expect(repo.stargazers_count).to.equal(6);
    expect(repo.watchers_count).to.equal(6);
    expect(repo.size).to.equal(4);
    expect(repo.default_branch).to.equal('master');
    expect(repo.open_issues_count).to.equal(1);
    expect(repo.has_issues).to.equal(true);
    expect(repo.has_wiki).to.equal(true);
    expect(repo.has_pages).to.equal(false);
    expect(repo.has_downloads).to.equal(true);
    expect(repo.pushed_at).to.equal('2016-05-24T19:43:53Z');
    expect(repo.created_at).to.equal('2013-02-02T20:36:12Z');
    expect(repo.updated_at).to.equal('2016-01-11T06:27:23Z');
  });
});
