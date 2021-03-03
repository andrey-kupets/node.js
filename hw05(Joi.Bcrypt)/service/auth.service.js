const { passwordHasher } = require('../helpers');

module.exports = {
    authorize: (password, userObj, preferLang) => passwordHasher.compare(password, userObj.password, preferLang)
};
