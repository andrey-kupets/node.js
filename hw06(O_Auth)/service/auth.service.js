const { O_Auth } = require('../models');

module.exports = {
    authorize: (tokens) => O_Auth.create(tokens),
    deleteTokens: (tokens) => O_Auth.deleteOne(tokens)
};
