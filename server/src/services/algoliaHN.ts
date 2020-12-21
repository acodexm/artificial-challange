import fetch from 'node-fetch';
const getData = () => {
  return fetch('https://hn.algolia.com/api/v1/items/25266288', { method: 'GET' })
    .then((res) => res.json())
    .catch(console.error);
};
export { getData };
