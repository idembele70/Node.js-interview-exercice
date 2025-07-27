const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
  res.status(200).json({ message: 'Admin home'});
})

router.get('/stats', (req, res) => {
  res.status(200).json({ users: 5, active: true});
})

module.exports = router;