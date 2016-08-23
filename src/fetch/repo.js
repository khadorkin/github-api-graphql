export class Repo {
  static async gen(loaders, fullName: string): Promise<?Repo> {
    const rawData = await loaders.repos.load(fullName);
    if (rawData === null) return null;

    return rawData;
  }
}
