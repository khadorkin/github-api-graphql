class Repo {
  static async gen(loaders, fullName: string): Promise<?Repo> {
    const rawData = await loaders.repos.load(fullName);
    if (rawData === null) return null;

    return rawData;
  }
}

export class RepoIssues {
  static async gen(loaders, fullName: string, args): Promise<?RepoIssues> {
    let state = 'open';
    if (args.state !== undefined) {
      state = args.state;
    }
    const rawData = await loaders.repoIssues.load({ fullName: fullName, state: state });
    if (rawData === null) return null;

    if (args.milestone !== undefined) {
      // TODO
    }

    return rawData;
  }
}
export default Repo;
