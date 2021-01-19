import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  } catch (e) {
    throw new Error(`File ${fullPath} does not exist`);
  }
};

export default (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const keys1 = Object.keys(data1);
  const data2 = getData(filepath2);
  const keys2 = Object.keys(data2);
  const allKeys = _.concat(keys1, keys2);
  const uniqKeys = _.uniq(allKeys).sort();

  const result = uniqKeys.reduce((acc, key) => {
    const tab = '  ';
    if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
      return `${acc}${tab}${tab}${key}: ${data1[key]}\n`;
    } if (_.has(data1, key) && !_.has(data2, key)) {
      return `${acc}${tab}- ${key}: ${data1[key]}\n`;
    } if (!_.has(data1, key) && _.has(data2, key)) {
      return `${acc}${tab}+ ${key}: ${data2[key]}\n`;
    } if (_.has(data1, key) && _.has(data2, key)) {
      return `${acc}${tab}- ${key}: ${data1[key]}\n${tab}+ ${key}: ${data2[key]}\n`;
    }

    return acc;
  }, '');

  return `{\n${result}}`;
};
