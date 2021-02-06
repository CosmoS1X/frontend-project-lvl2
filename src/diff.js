/* eslint-disable object-curly-newline */
import _ from 'lodash';

const diff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = _.uniq([...keys1, ...keys2]);
  const sorted = _.sortBy(commonKeys);

  return sorted.map((key) => {
    switch (true) {
      case (_.has(data1, key) && typeof data1[key] === 'object') && (_.has(data2, key) && typeof data2[key] === 'object'):
        return { name: key, status: 'hasChildren', children: diff(data1[key], data2[key]) };
      case _.has(data1, key) && _.has(data2, key) && (typeof data1[key] !== 'object' || typeof data2[key] !== 'object'):
        return data1[key] === data2[key]
          ? { name: key, value: data1[key], status: 'unchanged' }
          : { name: key, value: data2[key], status: 'changed', oldValue: data1[key] };
      case _.has(data1, key) && !_.has(data2, key):
        return { name: key, value: data1[key], status: 'deleted' };
      case !_.has(data1, key) && _.has(data2, key):
        return { name: key, value: data2[key], status: 'added' };
      default:
        return 'unknown state';
    }
  });
};

export default diff;
