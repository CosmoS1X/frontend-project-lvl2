import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

export const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  try {
    const format = path.extname(fullPath);
    const data = fs.readFileSync(fullPath, 'utf-8');
    return format === '.json' ? JSON.parse(data) : yaml.load(data);
  } catch (e) {
    throw new Error(`File ${fullPath} does not exist`);
  }
};

const stringify = (data, depth) => {
  const tab = '    ';
  if (data === undefined || data === null || typeof data !== 'object') {
    return data;
  }
  const entries = Object.entries(data);
  const result = entries.reduce(
    (acc, [key, value]) => `${acc}${tab.repeat(depth + 2)}${key}: ${stringify(value, depth + 1)}\n`,
    '',
  );

  return `{\n${result}${tab.repeat(depth + 1)}}`;
};

export default (data) => {
  const iter = (d, depth) => {
    const tab = '    ';
    const result = d.reduce((acc, item) => {
      const {
        name,
        value,
        status,
        oldValue,
        children,
      } = item;

      if (status === 'hasChildren') {
        return `${acc}${tab.repeat(depth)}    ${name}: ${iter(children, depth + 1)}\n`;
      }
      if (status === 'added') {
        return `${acc}${tab.repeat(depth)}  + ${name}: ${stringify(value, depth)}\n`;
      }
      if (status === 'deleted') {
        return `${acc}${tab.repeat(depth)}  - ${name}: ${stringify(value, depth)}\n`;
      }
      if (status === 'unchanged') {
        return `${acc}${tab.repeat(depth)}    ${name}: ${value}\n`;
      }
      if (status === 'changed') {
        return `${acc}${tab.repeat(depth)}  - ${name}: ${stringify(oldValue, depth)}\n${tab.repeat(depth)}  + ${name}: ${stringify(value, depth)}\n`;
      }

      return acc;
    }, '');

    return `{\n${result}${tab.repeat(depth)}}`;
  };

  return iter(data, 0);
};
