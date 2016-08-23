export class AuthenticatedUser {
  static async gen(loaders, userName: string): Promise<?AuthenticatedUser> {
    const rawData = await loaders.users.load(userName);
    if (rawData === null) return null;
    return rawData;
  }
}

export class User {
  static async gen(loaders, userName: string): Promise<?User> {
    const rawData = await loaders.users.load(userName);
    if (rawData === null) return null;

    return rawData;
  }
}

export class UserFollowers {
  static async gen(loaders, userNames: Array<string>): Promise<?UserFollowers> {
    const rawData = await loaders.users.loadMany(userNames);
    if (rawData === null) return null;

    return rawData;
  }
}
