import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const mapping = {
  stylish,
  plain,
  json,
};

export default (data, formatter) => mapping[formatter](data);
