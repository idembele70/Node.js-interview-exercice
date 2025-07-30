const router = require('express').Router()

router.get('/hello', (req, res) => {
  res.json({message: 'Hello from route!'});
})

module.exports = router