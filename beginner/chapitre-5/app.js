import express from 'express';
import helmet from 'helmet';
import fs from 'fs/promises';
import path from 'path';
import { createPost, getAllPosts } from './controllers/postController.js';
import verifyAdmin from './middlewares/verifyAdmin.js';
const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false,
}))
app.use(express.json());

const waitXSecond = async (durationInSecond) => {
  const durationInMS = durationInSecond * 1000;
  return new Promise((resolve) => (
    setTimeout(() => { 
      resolve({ waited: `${durationInSecond} seconds`
      }) }, durationInMS)
  )
  )
}

app.get('/wait/:sec', async (req, res) => {
  try {  
    const duration = req.params['sec'];
    const result = await waitXSecond(duration);
    res.status(200).json(result);
  } catch (err) {
    console.error(err)
    res.status(404).json(err)
  }
})

app.get('/read/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const data = await fs.readFile(path.resolve('files', filename), 'utf-8');
    res.status(200).json(data)
  } catch(err) {
    console.error(err);
    res.status(404).json(err)
  }
})


app.get('/posts/', getAllPosts);
app.post('/posts/new', createPost)

app.use(verifyAdmin)

app.get('/admin', (req, res) => {
  res.statusCode = 200;
  res.json({ message: 'Welcome to admin page'});
})
app.listen(8080, () => {
  console.log('Listenning on port %d', 8080);
})

export default app;