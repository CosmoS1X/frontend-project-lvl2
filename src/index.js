import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import genDiffObject from './genDiffObject.js';
import applyFormatter from './formatters/index.js';

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const getFormat = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(getData(filepath1), getFormat(filepath1));
  const data2 = parse(getData(filepath2), getFormat(filepath2));
  const result = genDiffObject(data1, data2);

  return applyFormatter(result, formatName);
};
