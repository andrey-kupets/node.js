const { O_Auth } = require('../models');
const { tokenizer } = require('../helpers');

module.exports = {
  createRecord: async (userId) => {
    const tokens = tokenizer();
    await O_Auth.create({ _user_id: userId, ...tokens });

    return tokens;
  },
  findTokensByParams: (token) => O_Auth.findOne(token),
  updateById: (id, updatedObj) => O_Auth.findByIdAndUpdate(id, updatedObj),
  deleteAuthRecords: async (req) => {
    await O_Auth.deleteMany({ createdAt: { $lte: new Date(req) } });
    // await O_Auth.deleteMany({ createdAt: { $lte: req.toDate() } });
  },
};
