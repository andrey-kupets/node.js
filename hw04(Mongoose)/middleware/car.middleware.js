const resCodes = require('../constant/responseCodes.enum');
const errMessages = require('../messages/car/error.messages');
const carService = require('../service/car.service');

module.exports = {
    isCarValid: (req, res, next) => {
        try {
            const {
                model, edition, preferLang = 'ua'
            } = req.body;

            if (!model || !edition) {
                throw new Error(errMessages.EMPTY[preferLang]);
            }

            if (Number.isNaN(edition)) {
                throw new Error(errMessages.INVALID_EDITION[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },

    isCarIdValid: (req, res, next) => {
        try {
            const { carId } = req.params;
            const { preferLang = 'ua' } = req.body;

            if (carId.length !== 24) {
                throw new Error(errMessages.INVALID_ID[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },

    doesCarExist: async (req, res, next) => {
        try {
            const { preferLang = 'ua' } = req.body;
            // eslint-disable-next-line max-len
            const cars = await carService.findAllCars(req.body);// вообще-то точно такая машинка может быть(есть вероятность), это надо сверять только по серийному номеру(вводить в модель)

            if (cars.length) {
                throw new Error(errMessages.CAR_EXISTS[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },

    areNoCars: async (req, res, next) => {
        try {
            const { preferLang = 'ua' } = req.body;
            const users = await carService.findAllCars(req.query);

            if (!users.length) {
                throw new Error(errMessages.NO_CARS[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },

    isNoCar: async (req, res, next) => {
        try {
            const { params: { carId }, body: { preferLang = 'ua' } } = req;
            const car = await carService.findCarById(carId);

            if (!car) {
                throw new Error(errMessages.NO_CAR[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },
};
