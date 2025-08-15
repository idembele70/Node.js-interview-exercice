const express = require('express');
const app = express();
const z = require('zod');
const _ = require('lodash');

// Question 6
function validateQuery(req, res, next) {
    const querySchema = z.object({
      page: z.coerce.number().int().positive().default(1),
      limit: z.coerce.number().int().positive().max(100).default(10),
    });

    // type QueryType = z.infer<typeof querySchema>;

    const result = Query.safeParse(req.query);

    if(!result.sucess) {
      console.error('Invalid query params:', result.error.flatten());
      res.status(400).json({ errors: result.error.flatten().fieldErrors });
      return;
    }
    req.query = result.data // as QueryType;
    next();
}

app.get('/home', validateQuery, (req, res) => {
  res.status(200).send('Welcome to home page!');
})


// Question 7

// interface User {
//  readonly id?: number;
//  readonly name?: string;
//  readonly email?: string;
//};

function mergeUserData(user1, user2) {
  return _.merge({}, user1, user2); // copie afin d'éviter la mutation;
};

// Question 8

app.use(express.json());

const products = [
  { name: 'pasta', price: 25 },
  { name: 'juice', price: 50 },
];

function validateBody(req, res, next) {
    const productSchema = z.object({
      name: z.string().min(1),
      price: z.coerce.number().positive(),
    });

  // type ProductType = z.infer<typeof productSchema>;

    const result = Product.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors });
      return;
    }
    req.body = result.data;
    next();
  }

app.put('/products/:id', validateBody, (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((_p, id) => i + 1 === parseInt(req.params.id));

  if (index === -1) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  const updatedProduct = { ...product[index], price: req.body.price };
  products = products.map((p, i) => (i === index ? updatedProduct : p));

  res.status(200).json({
    message: 'Product updated',
    product: updatedProduct,
  });
});

// Question 9
function cacheControl(req, res, next) {
  if (req.method === 'GET') {
    res.setHeader('cache-Control', 'public, max-age=3600');
  }
  next();
}

app.use(cacheControl);

app.use('/cache/control', (req, res) => {
  res.sendStatus(200);
})

// QUESTION 10

async function parallelFetch(urls) {
  const results = await Promise.allSettled(
    urls.map( async (url) => { 
     const res = await fetch(url);
     if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
     return res.json();
    })
    );
  return results.map((r) => (r.status === 'fulfilled' ? r.value : null))
}

(async function(){
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
    'https://jsonplaceholder.typicode.csom/posts/unexisting'
  ];

  const data = await parallelFetch(urls);
  console.log('My data:', data);
})()

const PORT = 8945;
app.listen(PORT, () => {
  console.log('Server connected at http://localhost:%d/', PORT);
})
