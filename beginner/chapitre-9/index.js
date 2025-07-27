import express from 'express';
const app = express();

// Exercise 9
import helmet from 'helmet';
app.use(helmet())

// Exercise 6
app.get('/product/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    res.status(200).json({ slug });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error'});
  }
});

// Exercise 7
app.post('api/login', (req, res) => {
  const { username, password } = req.body;

  if(!username || ! password)
    return res.status(400).send('Missing credentials');

  res.status(200).send('Logged in');
});

// Exercise 8

const logIp = function(req = express.request, res, next){
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from IP ${req.ip}`);
  next();
}

app.get('/ip', logIp, (req, res) => {
  try {
    res.status(200).json({ message: 'Your ip has been logged in the console'});
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Interval server error'});
  }
})

const db = {
  findUsers : async () => [{ id:1, name: 'toto'}, { id: 2, name: 'meme' }],
}
// exercise 10
app.get('/users', async (req, res) => {
  try {
    const users = await db.findUsers();
    res.status(200).json(users);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error! '});
  }
})

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log('App is running on http://localhost:%s', PORT);
});