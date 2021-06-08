import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (data, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      throw new Error(`${formatter} is unknown formatter`);
  }
};
