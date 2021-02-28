const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.post('/', carMiddleware.isCarValid, carController.createCar);

router.get('/', carController.getAllCars);

router.delete('/:carId', carMiddleware.isCarIdValid, carController.deleteCar);

router.get('/:carId', carMiddleware.isCarIdValid, carController.getCarById);

module.exports = router;
