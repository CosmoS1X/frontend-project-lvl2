import _ from 'lodash';
import getData from './src/parsers.js';

export default (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const keys1 = Object.keys(data1);
  const data2 = getData(filepath2);
  const keys2 = Object.keys(data2);
  const uniqKeys = _.uniq(_.concat(keys1, keys2)).sort();

  const result = uniqKeys.reduce((acc, key) => {
    const fileOneHasKey = _.has(data1, key);
    const fileTwoHasKey = _.has(data2, key);
    const tab = '  ';

    if (fileOneHasKey && fileTwoHasKey) {
      return data1[key] === data2[key]
        ? `${acc}${tab}${tab}${key}: ${data1[key]}\n`
        : `${acc}${tab}- ${key}: ${data1[key]}\n${tab}+ ${key}: ${data2[key]}\n`;
    }

    if (fileOneHasKey && !fileTwoHasKey) {
      return `${acc}${tab}- ${key}: ${data1[key]}\n`;
    }
    if (!fileOneHasKey && fileTwoHasKey) {
      return `${acc}${tab}+ ${key}: ${data2[key]}\n`;
    }

    return acc;
  }, '');

  return `{\n${result}}`;
};
