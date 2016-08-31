import { graphql } from 'graphql';
import Schema from '../../schema';
import createLoaders from '../../fetch/loaders';

const context = {
  viewer: {},
  loaders: createLoaders(),
};

export default function runQuery(query) {
  const result = graphql(Schema, query, null, context);
  return result;
}
