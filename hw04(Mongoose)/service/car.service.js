const Car = require('../models/Car');
const errMessages = require('../messages/car/error.messages');

module.exports = {
    createCar: async (carObj, preferLang) => {
        // eslint-disable-next-line max-len
        const cars = await Car.find(carObj);// вообще-то точно такая машинка может быть, это надо сверять только по серийному номеру(вводить в модель)

        if (cars.length) {
            throw new Error(errMessages.CAR_EXISTS[preferLang]);
        }

        return Car.create(carObj);
    },

    findAllCars: async (query, preferLang) => {
        const cars = await Car.find(query);

        if (!cars.length) {
            throw new Error(errMessages.NO_CARS[preferLang]);
        }

        return cars;
    },

    deleteCar: (carId) => Car.deleteOne({ _id: carId }),

    findCarById: async (carId, preferLang) => {
        const car = await Car.findById(carId);

        if (!car) {
            throw new Error(errMessages.NO_CAR[preferLang]);
        }

        return car;
    }
};
