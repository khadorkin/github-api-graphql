class Repo {
  static async gen(loaders, fullName: string): Promise<?Repo> {
    const rawData = await loaders.repos.load(fullName);
    if (rawData === null) return null;

    return rawData;
  }
}

export class RepoIssues {
  static async gen(loaders, fullName: string): Promise<?RepoIssues> {
    const rawData = await loaders.repoIssues.load(fullName);
    if (rawData === null) return null;

    return rawData;
  }
}
export default Repo;
