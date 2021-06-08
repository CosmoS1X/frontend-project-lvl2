import getData from './src/parsers.js';
import genDiffObject from './src/genDiffObject.js';
import applyFormatter from './src/formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const result = genDiffObject(data1, data2);

  return applyFormatter(result, formatName);
};
