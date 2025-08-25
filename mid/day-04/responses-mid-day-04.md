====
QCM
====
1. A, B
2. A
3. B
4. B
5. A

=====
CODE
=====
6. ```js
const validateApiKey = (req, res, next) => {
  const apiKey = req.get('x-api-key');

  try {
    if (!apiKey)
      return res.status(401).json({ message: 'Access denied' });
    next()
  } catch (error) {
    console.error('Error during api key validation', error);
    res.status(500).json({ message: error.message });
  }
}
```
7.  ```js
// const fs = require('fs/promises');
// const fs = require('fs').promises
 const { promisify } = require('util');
 const readFileAsync = promisify(require('fs').readFile)
const readJSONFile = async (filePath) => {
  try {
    //const data = await fs.readFile(filePath, 'utf8');
    const data = await readFileAsync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
      return parsedData;
  } catch (err) {
    console.error('Error while reading JSON file', err);
    return null;
  }
}
```
8. ```js
const _ = require('lodash');

const products = [ 
  { id: 1, name: "Laptop", category: "electronics" },
  { id: 2, name: "Shoes", category: "fashion" },
  { id: 3, name: "Phone", category: "electronics" },
];

const groupByCategory = (products) => {
  const itemsByCategory = _.groupBy(products, 'category');

  const categoryItemsName = _.mapValues(itemsByCategory, (category) => {
    return _.map(category, 'name');
  })
    return categoryItemsName;
}
```
9. ```js
const orders = [
  { id: 1, item: ['shoes', 'tees' ] },
  { id: 2, item: ['watch', 'jewelry'] },
];

app.get('/orders/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const order = orders.find((o) => o.id === id);
    if (!order)
      return res.status(404).json({ message: 'Not Found' });
    res.status(200).json(order);
  } catch (err) {
    console.error(error)
  }
});
```
10. ```js
const fetchUsersInParallel = async (ids) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com/users/';

  const promise = await Promise.allSettled(ids.map(async (id) => {
      const url = new URL(id, baseUrl).href;

      const res = await fetch(url)
      return res.json()
    })
  )

  return promise.map(el => el.status === 'fulfilled' ? el.value : null);
}
```
