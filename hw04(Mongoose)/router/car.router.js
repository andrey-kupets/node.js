const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.post('/', carMiddleware.isCarValid, carMiddleware.doesCarExist, carController.createCar);

router.get('/', carMiddleware.areNoCars, carController.getAllCars);

router.delete('/:carId', carMiddleware.isCarIdValid, carController.deleteCar);

router.get('/:carId', carMiddleware.isCarIdValid, carMiddleware.isNoCar, carController.getCarById);

module.exports = router;