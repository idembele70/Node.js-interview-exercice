const express = require('express');
const app = express();
const router = express.Router();

const usersRoute = require('./routes/user.cjs')
router.use('/user', usersRoute)
app.use(router)

app.listen(3000, () => {
  console.log('Listening on PORT %s', 3000);
})