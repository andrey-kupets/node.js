const Joi = require('joi');

module.exports = Joi.object({
    model: Joi.string().alphanum().min(2).max(30),
    edition: Joi.number(),
    power_hp: Joi.number(),
    price: Joi.number(), // что я только не пробовал
    // price: Joi.allow(), // что я только не пробовал
    // price: Joi.object(), // что я только не пробовал
    category: Joi.string(), // что я только не пробовал
    // category: Joi.allow(), // что я только не пробовал
    // category: Joi.object(), // что я только не пробовал
    color: Joi.string()
});
