import githubSchema from '../';
import { graphql } from 'graphql';

export async function github(query) {
  const result = await graphql(githubSchema, query);
  if (result.errors !== undefined) {
    throw new Error(JSON.stringify(result.errors, null, 2));
  }
  return result;
}
