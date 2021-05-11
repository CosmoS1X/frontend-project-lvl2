import getData from '../src/parsers.js';
import diff from '../src/diff.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const result = diff(data1, data2);

  switch (formatName) {
    case 'stylish':
      return stylish(result);
    case 'plain':
      return plain(result);
    case 'json':
      return json(result);
    default:
      throw new Error(`${formatName} is unknown formatter`);
  }
};
