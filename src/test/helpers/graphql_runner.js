import { graphql } from 'graphql';
import Schema from '../../schema';
import createLoaders from '../../fetch/loaders';

const context = {
  viewer: {},
  loaders: createLoaders(),
};

function clearLoaders(loaders) {
  Object.keys(loaders).forEach((key) => {
    loaders[key].clearAll();
  });
}

export default function runQuery(query) {
  clearLoaders(context.loaders);
  const result = graphql(Schema, query, null, context);
  return result;
}
