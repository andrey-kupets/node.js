const Joi = require('joi');

module.exports = Joi.object({
    model: Joi.string().alphanum().min(2).max(30),
    edition: Joi.number(),
    power_hp: Joi.number(),
    color: Joi.string()
});
