/* eslint-disable object-curly-newline */
const checkValue = (data) => {
  if (data === undefined || data === null) {
    return data;
  }

  switch (typeof data) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${data}'`;
    default:
      return data;
  }
};

const buildString = (data) => {
  const iter = (content, acc, ancestry) => {
    const { name, value1, value2, type, children } = content;

    const newAncestry = `${ancestry}.${name}`;
    const pattern = `${acc}Property '${newAncestry.slice(1)}'`;

    switch (type) {
      case 'hasChildren':
        return children.flatMap((child) => iter(child, acc, newAncestry));
      case 'added':
        return `${pattern} was added with value: ${checkValue(value1)}`;
      case 'deleted':
        return `${pattern} was removed`;
      case 'changed':
        return `${pattern} was updated. From ${checkValue(value2)} to ${checkValue(value1)}`;
      default:
        return acc;
    }
  };

  return [iter(data, '', '')]
    .flat()
    .filter((item) => item !== '')
    .join('\n');
};

export default (data) => data.map((item) => buildString(item)).join('\n');
