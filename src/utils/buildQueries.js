const isEmpty = val => val == null || !(Object.keys(val) || val).length;

const buildQueries = (queries = {}) => {
  if (isEmpty(queries)) {
    return '';
  }
  const queriesString = Object.keys(queries)
    .map(el => `${el}=${queries[el]}`)
    .join('&');
  return `?${queriesString}`;
}

export default buildQueries;