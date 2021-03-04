const { O_Auth } = require('../models');

module.exports = {
    authorize: (tokens, _user_id) => O_Auth.create({ ...tokens, _user_id })
};
