const Joi = require('joi');

module.exports = Joi.object({
    model: Joi.string().alphanum().min(2).max(30),
    edition: Joi.number(),
    power_hp: Joi.number(),
    price: Joi.number(),
    category: Joi.string(),
    color: Joi.string(),
    data: Joi.allow(),
    page: Joi.allow(),
    limit: Joi.allow(),
    count: Joi.allow(),
    pages: Joi.allow(),
    docs: Joi.any(), // for experiment only
    videos: Joi.any(),
    photos: Joi.any(),
    _id: Joi.any(),
    $op: Joi.any(),
    isNew: Joi.any(),
    errors: Joi.any(),
    _doc: Joi.any(),
    $init: Joi.any(),
    $locals: Joi.any(),
    $__: Joi.any(),
});

// cars.forEach((car) => {
//     const { error } = findCarByQueryValidator.validate(car);
//     if (error) {
//         throw new Error(error.details[0].message);
//     }
// });
