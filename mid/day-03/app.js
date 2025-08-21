import express from "express";
import lodash from "lodash";

const app = express();

app.use(express.json());

app.post('/req/body', (req, res) => {
  console.log(req.body);
  res.end('Done\n');
});

const obj = { email: 'johndoe@mail.fr', password: 'P@ssw0rd!?123' };
const newObj = lodash.omit(obj, ['password']);

const obj2 = { email: 'janedoe@mail.fr' };
const newObj2 = lodash.omit(obj2, ['password']);

//console.log(newObj);
//console.log(newObj2);

// Exercice 6
function validateHeaders(req, res, next) {
  const expectedContentType = 'application/json';
  const contentTypeHeader = req.get('content-type');

  if(!contentTypeHeader || contentTypeHeader.includes(expectedContentType)) {
    res.status(400).json({ error: 'Invalid Content-Type'});
    return;
  }
  next(); 
}

// Exercice 7

app.post('/content/type', validateHeaders, (req, res) => {
  console.log(req.body);
  res.status(200).send('Success\n');
});

async function getUserData(userId) {
  const baseUrl = 'https://jsonplaceholder.typicode.com/users/';

  try {
    const url = new URL(userId, baseUrl);
    const res = await fetch(url.href);

    if(!res.ok) {
      return null;
    }
    return res.json();
  } catch (err) {
    console.error('Error during fetch:', err);
    return null
  }
}

(async function() {
  const userData = await getUserData(1)
 // console.log(userData);
})()

// Exercice 8
function sanitizeUser(user) {
return lodash.pick(user, ['id', 'name', 'email']);
}

const user = { id:1254, name: 'John doe', email: 'johndoe@mail.fr', password: 'P@ssw0rd!?123' };
//console.log(sanitizeUser(user));

// Exercice 9
const products = [
  { id: 1, name: 'Book', price: 15 },
  { id: 2, name: 'Pen', price: 5 }
];
app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    res.status(404).send('Product not found');
    return;
  }
  res.status(200).json(product);
});

async function FetchInParallels(urls) {
  const result = await Promise.allSettled(urls.map(url => 
    fetch(url).then(res => res.json())
  ))

  return result.map(r => r.status === 'fulfilled' ? r.value : null)
}

(async function(){
 const data = await FetchInParallels(
  [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/users/2',
    'https://jsonplaceholder.typicode.com/users/3',
  ]
  );
  console.log(data);
})()

const PORT = 5419;
app.listen(PORT, () => {
  console.log('Listenning on port: %d', PORT);
});


