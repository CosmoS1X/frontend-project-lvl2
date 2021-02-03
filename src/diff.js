/* eslint-disable object-curly-newline */
import _ from 'lodash';

const diff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = _.uniq(_.concat(keys1, keys2));

  return commonKeys
    .sort()
    .reduce((acc, key) => {
      if ((_.has(data1, key) && typeof data1[key] === 'object') && (_.has(data2, key) && typeof data2[key] === 'object')) {
        acc.push({ name: key, status: 'hasChildren', children: diff(data1[key], data2[key]) });
      }
      if (_.has(data1, key) && _.has(data2, key) && (typeof data1[key] !== 'object' || typeof data2[key] !== 'object')) {
        const check = data1[key] === data2[key]
          ? { name: key, value: data1[key], status: 'unchanged' }
          : { name: key, value: data2[key], status: 'changed', oldValue: data1[key] };
        acc.push(check);
      }
      if (_.has(data1, key) && !_.has(data2, key)) {
        acc.push({ name: key, value: data1[key], status: 'deleted' });
      }
      if (!_.has(data1, key) && _.has(data2, key)) {
        acc.push({ name: key, value: data2[key], status: 'added' });
      }

      return acc;
    }, []);
};

export default diff;
