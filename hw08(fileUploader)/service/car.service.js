const { Car } = require('../models');

module.exports = {
    createCar: (carObj) => Car.create(carObj),

    findAllCars: (query) => Car.find(query),

    deleteCar: (carId) => Car.deleteOne({ _id: carId }),

    findCarById: (carId) => Car.findById(carId),

    shiftCar: (carId, newCarObj) => Car.findByIdAndUpdate(carId, newCarObj),

    updateCarById: (carId, updatedObject) => Car.updateOne({ _id: carId }, { $set: updatedObject })
};
