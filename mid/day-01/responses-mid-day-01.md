====
QCM
====
1. A
2. B
3. B
4. B
5. B
====
CODE
====
6.
function validateQuery(req, res, next) {
  try {
    const Query = z.object({
      page: z.coerce.number().int(),
      limit: z.coerce.number().int(),
    });

    const query = Query.parse(req.query);
    req.query = query;
    next();
  } catch (err) {
      console.error('Error during parse:', err);
      res.sendStatus(400);
    }
}

app.get('/home', validateQuery, (req, res) => {
  res.status(200).send('Welcome to home page!');
})

7.
function mergeUserData(user1, user2) {
  return _.merge(user1, user2);
}
8. 
const products = [
  { name: 'pasta', price: 25, id: 1 },
  { name: 'juice', price: 50, id: 2 },
];

function validateBody(req, res, next) {
  try {
    const Product = z.object({
      name: z.string(),
      price: z.coerce.number().int(),
    });

    const body = Product.parse(req.body);
    req.body = body;
    next();
  } catch (err) {
    console.error('Error during parse:%s', err);
    res.sendStatus(400);
  }
}

app.put('/products/:id', validateBody, (req, res) => {
  const { name, price } = req.body;
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  const product = products[index];

  const isNameEqual = name === product.name;
  if (index === -1 || !isNameEqual) {
    res.sendStatus(404);
    return;
  }

  products.splice(index, 1, {...product, price });
  res.status(200).json({
    message: 'Product updated',
    name,
    price,
  });
});

9.

function cacheControl(req, res, next) {
  console.log(req);
  if (req.method === 'GET') {
    const headers = new Headers({
      'Cache-Control': 'public' ,
      'max-age': '3600',
    });
    res.setHeaders(headers);
  }
  next();
}

app.use(cacheControl);

10.

async function parallelFetch(urls) {
  const data = await Promise.all(urls.map(url =>
    fetch(url)
    .then(res => res.json())
    .catch(err => null)
  ));
  return data
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
  'https://jsonplaceholder.typicode.csom/posts/unexisting'
]

const d = parallelFetch(urls);
console.log('My data:', d);

