export default (data) => {
  const result = data.reduce((acc, item) => `${acc}${JSON.stringify(item)},`, '');

  return `[${result.slice(0, result.length - 1)}]`;
};
