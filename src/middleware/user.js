const asyncWrapper = require('../plugins/asyncWrapper');
const { User } = require('../models');
const { NOT_FOUND_USER } = require('../utils/constants');

const checkUser = async (userId) => {
  const user = await User.findByPk(userId);

  return user !== null;
};

exports.verifyUser = asyncWrapper(async (req, res, next) => {
  const isRegistered = await checkUser(req.user.uid);

  if (!isRegistered) {
    return res.fail(404, {
      name: NOT_FOUND_USER,
      message: 'Please register first. User not found!',
    });
  }

  next();
});
