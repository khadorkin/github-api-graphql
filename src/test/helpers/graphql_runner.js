import Schema from '../../schema';
import { graphql } from 'graphql';
import { createLoaders } from '../../fetch/loaders';

const context = {
  viewer: {},
  loaders: createLoaders(),
};

export function runQuery(query) {
  return graphql(Schema, query, null, context);
}
