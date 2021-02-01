import { getData } from './src/parsers.js';
import diff from './src/diff.js';

export default (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  return diff(data1, data2);
};
