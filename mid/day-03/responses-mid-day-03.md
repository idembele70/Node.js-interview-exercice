====
QCM
====
1. A, C
2. A, C
3. B
4. A, B, C
5. A, B, D

=====
CODE
=====
6. ```ts
function validateHeaders(req, res, next) {
  const expectedContentType = 'application/json';
  const contentTypeHeader = req.get('content-type');

  if(!contentTypeHeader || contentTypeHeader. !== expectedContentType) {
    res.sendStatus(400);
    return;
  }
  next();  
}
```
7. ```ts
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
  }
}
```
8. ```ts
function sanitizeUser(user) {
return lodash.pick(user, ['id', 'name', 'email']);
}
```
9. ```ts
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === id);
  
  if (index === -1) {
    res.status(404).send('Product not found');
    return;
  }
  res.status(200).json(products[index]);
});
```
10. ```ts
async function FetchInParallels(urls) {
  const result = await Promise.allSettled(urls.map(url => 
    fetch(url).then(res => res.json()).catch(err => null)
  ))

  return result.map(res => res.status === 'fulfilled' ? res.value : null)
}
```

