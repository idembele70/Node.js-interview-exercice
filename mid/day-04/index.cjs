const express = require('express');

const app = express();

// Exercice 6

const validateApiKey = (req, res, next) => {
  const apiKey = req.get('x-api-key');

    if (!apiKey)
      return res.status(401).json({ message: 'Access denied' });
    next();

}

app.get('/x/api/key', validateApiKey, (req, res) => {
  res.sendStatus(200);
});

// Exercice 7
// const fs = require('fs/promises');
// const fs = require('fs').promises
 const { promisify } = require('util');
 const readFileAsync = promisify(require('fs').readFile)
const readJSONFile = async (filePath) => {
  try {
    //const data = await fs.readFile(filePath, 'utf8');
    const data = await readFileAsync(filePath, 'utf8');

      return JSON.parse(data);
  } catch (err) {
    console.error('Error while reading JSON file', err.message);
    return null;
  }
}
/*(async () => {
  const filePath = 'empty.json';
  const data = await readJSONFile(filePath);

  console.log('data:', data);
})()
*/

// Exercice 8
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

//const productsCategories = groupByCategory(products);
//console.log(productsCategories);

// Exercice 9
const orders = [
  { id: 1, item: ['shoes', 'tees' ] },
  { id: 2, item: ['watch', 'jewelry'] },
];

app.get('/orders/:id', (req, res) => {
    const id = Number(req.params.id);
    const order = orders.find((o) => o.id === id);
    if (!order)
      return res.status(404).json({ message: 'Not Found' });
    res.status(200).json(order);
  
});

// Exercice 10
const fetchUsersInParallel = async (ids) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com/users/';

  const results = await Promise.allSettled(ids.map(async (id) => {
      const url = new URL(id.toString(), baseUrl).href;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed for id ${id}`);
      return res.json()
    })
  )

  return results.map(el => el.status === 'fulfilled' ? el.value : null);
}

const ids = [1, 2, 3, 4, 5];
fetchUsersInParallel(ids)
  .then(console.log);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}/`)
})
