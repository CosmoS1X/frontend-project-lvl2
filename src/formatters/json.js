export default (data) => {
  const result = data.map((item) => JSON.stringify(item)).join(',');

  return `[${result}]`;
};
