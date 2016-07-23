export class AuthenticatedUser {
  static async gen(loaders): Promise<?AuthenticatedUser> {
    // const rawData = await loaders.getUser()
  }
}

export class User {
  static async gen(loaders, userName: string): Promise<?User> {
    const rawData = await loaders.users.load(userName);
    if (rawData === null) return null;

    return rawData;
  }
}
