import dotenv from 'dotenv';
dotenv.config({ path: './.env'});

import http from 'http';

http.createServer((req, res) => {
  const body = 'Hello World!'
  res.writeHead(200, {
    'content-length': Buffer.byteLength(body),
    'content-type': 'text/plain'
  })
  .end(body)
}).listen(process.env.PORT, () => {
  console.log('Listening on port %s', process.env.PORT);
});

