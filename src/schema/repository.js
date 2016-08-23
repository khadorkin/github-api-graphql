import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  // GraphQLList,
} from 'graphql';

// import {
//   GHCommentType,
// } from './comment_type';

export const GHRepositoryType = new GraphQLObjectType({
  name: 'Repository',
  fields: {
    id: { type: GraphQLInt },
    // owner
    name: { type: GraphQLString },
    full_name: { type: GraphQLString },
    description: { type: GraphQLString },
    private: { type: GraphQLBoolean },
    fork: { type: GraphQLBoolean },
    url: { type: GraphQLString },
    html_url: { type: GraphQLString },
    archive_url: { type: GraphQLString },
    assignees_url: { type: GraphQLString },
    blobs_url: { type: GraphQLString },
    branches_url: { type: GraphQLString },
    clone_url: { type: GraphQLString },
    // collaborators: {
    //   type: new GraphQLList(GHUserType)
    // },
    collaborators_url: { type: GraphQLString },
    // comments: {
    //   type: new GraphQLList(GHCommentType),
    //   resolve: (parentValue, _, { rootValue: { user } }) => {
    //     console.log('Going to call with');
    //     console.log(parentValue.comments_url);
    //     console.log(user);
    //     return getFromURLWithAuth(parentValue.comments_url, user.accessToken);
    //   },
    // },
    comments_url: { type: GraphQLString },
    commits_url: { type: GraphQLString },
    compare_url: { type: GraphQLString },
    contents_url: { type: GraphQLString },
    contributors_url: { type: GraphQLString },
    downloads_url: { type: GraphQLString },
    events_url: { type: GraphQLString },
    forks_url: { type: GraphQLString },
    git_commits_url: { type: GraphQLString },
    git_refs_url: { type: GraphQLString },
    git_tags_url: { type: GraphQLString },
    git_url: { type: GraphQLString },
    hooks_url: { type: GraphQLString },
    issue_comment_url: { type: GraphQLString },
    issue_events_url: { type: GraphQLString },
    issues_url: { type: GraphQLString },
    keys_url: { type: GraphQLString },
    labels_url: { type: GraphQLString },
    languages_url: { type: GraphQLString },
    merges_url: { type: GraphQLString },
    milestones_url: { type: GraphQLString },
    mirror_url: { type: GraphQLString },
    notifications_url: { type: GraphQLString },
    pulls_url: { type: GraphQLString },
    releases_url: { type: GraphQLString },
    ssh_url: { type: GraphQLString },
    stargazers_url: { type: GraphQLString },
    statuses_url: { type: GraphQLString },
    subscribers_url: { type: GraphQLString },
    subscription_url: { type: GraphQLString },
    svn_url: { type: GraphQLString },
    tags_url: { type: GraphQLString },
    teams_url: { type: GraphQLString },
    trees_url: { type: GraphQLString },
    homepage: { type: GraphQLString },
    language: { type: GraphQLString },
    forks_count: { type: GraphQLInt },
    stargazers_count: { type: GraphQLInt },
    watchers_count: { type: GraphQLInt },
    size: { type: GraphQLInt },
    default_branch: { type: GraphQLString },
    open_issues_count: { type: GraphQLInt },
    has_issues: { type: GraphQLBoolean },
    has_wiki: { type: GraphQLBoolean },
    has_pages: { type: GraphQLBoolean },
    has_downloads: { type: GraphQLBoolean },
    pushed_at: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
});

