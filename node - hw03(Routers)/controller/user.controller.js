const userService = require('../service/user.service');

module.exports = {
    getAllUsers: (req, res) => {
        try {
            const users = userService.findAllUsers();
            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }

}
