const { passwordHasher } = require('../helpers');

module.exports = {
    authorize: (password, userObj) => passwordHasher.compare(password, userObj.password)
};
