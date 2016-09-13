class Repo {
  static async gen(loaders, fullName: string): Promise<?Repo> {
    const rawData = await loaders.repos.load(fullName);
    if (rawData === null) return null;

    return rawData;
  }
}

export class RepoIssues {
  static async gen(loaders, repoFullName: string, args): Promise<?RepoIssues> {
    let issueState = 'open';
    if (args.state !== undefined) {
      issueState = args.state;
    }
    const id = {
      fullName: repoFullName,
      state: issueState,
    };
    const rawData = await loaders.repoIssues.load(id);
    if (rawData === null) return null;

    if (args.milestone !== undefined) {
      // TODO
    }

    return rawData;
  }
}
export default Repo;
