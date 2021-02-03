import getData from './src/parsers.js';
import diff from './src/diff.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const result = diff(data1, data2);

  if (formatName === 'stylish') {
    return stylish(result);
  }
  if (formatName === 'plain') {
    return plain(result);
  }

  return `${formatName} is unknown formatter`;
};
