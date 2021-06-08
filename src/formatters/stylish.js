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
  const iter = (content, depth) => {
    const tab = '    ';
    const result = content.reduce((acc, item) => {
      const {
        name,
        value,
        status,
        oldValue,
        children,
      } = item;

      const pattern = `${tab.repeat(depth)}  `;

      switch (status) {
        case 'hasChildren':
          return `${acc}${pattern}  ${name}: ${iter(children, depth + 1)}\n`;
        case 'added':
          return `${acc}${pattern}+ ${name}: ${stringify(value, depth)}\n`;
        case 'deleted':
          return `${acc}${pattern}- ${name}: ${stringify(value, depth)}\n`;
        case 'changed':
          return `${acc}${pattern}- ${name}: ${stringify(oldValue, depth)}\n${pattern}+ ${name}: ${stringify(value, depth)}\n`;
        default:
          return `${acc}${pattern}  ${name}: ${value}\n`;
      }
    }, '');

    return `{\n${result}${tab.repeat(depth)}}`;
  };

  return iter(data, 0);
};
