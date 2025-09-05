const router = require('express').Router();
const carsRouter = require('./cars.routes');

router.use('/cars', carsRouter);

module.exports = router;
