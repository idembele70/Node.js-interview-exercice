const router = require('express').Router();

const {
  addCar,
  getCars,
  searchCars,
} = require('../controllers/cars.controllers');
const userAgent = require('../middleware/user-agent');
const authorizationHeader = require('../middleware/authorization-header');

router.use(userAgent);
//router.use(authorizationHeader);
router.post('/', addCar);
router.get('/', getCars);
router.get('/search', searchCars);

module.exports = router;
