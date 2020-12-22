import fetch from 'node-fetch';
const getData = (id: string) => {
  return fetch(`https://hn.algolia.com/api/v1/items/${id}`, { method: 'GET' })
    .then((res) => res.json())
    .catch(console.error);
};
export { getData };
