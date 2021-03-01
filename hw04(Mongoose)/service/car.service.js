const Car = require('../models/Car');

module.exports = {
    createCar: (carObj) => Car.create(carObj),

    findAllCars: (query) => Car.find(query),

    deleteCar: (carId) => Car.deleteOne({ _id: carId }),

    findCarById: (carId) => Car.findById(carId)
};
