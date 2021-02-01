import _ from 'lodash';

const diff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = _.uniq(_.concat(keys1, keys2)).sort();

  const result = commonKeys.reduce((acc, key) => {
    const fileOneHasKey = _.has(data1, key);
    const fileTwoHasKey = _.has(data2, key);

    if ((fileOneHasKey && typeof data1[key] === 'object') && (fileTwoHasKey && typeof data2[key] === 'object')) {
      acc.push({ name: key, status: 'hasChildren', children: diff(data1[key], data2[key]) });
    }
    if (fileOneHasKey && fileTwoHasKey && (typeof data1[key] !== 'object' || typeof data2[key] !== 'object')) {
      const check = data1[key] === data2[key]
        ? { name: key, value: data1[key], status: 'unchanged' }
        : {
          name: key,
          value: data2[key],
          status: 'changed',
          oldValue: data1[key],
        };
      acc.push(check);
    }
    if (fileOneHasKey && !fileTwoHasKey) {
      acc.push({ name: key, value: data1[key], status: 'deleted' });
    }
    if (!fileOneHasKey && fileTwoHasKey) {
      acc.push({ name: key, value: data2[key], status: 'added' });
    }

    return acc;
  }, []);

  return result;
};

export default diff;
