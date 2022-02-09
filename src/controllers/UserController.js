const asyncWrapper = require('../plugins/asyncWrapper');
const {
  addNewUser,
  checkUser,
  addUserDetail,
  addUserAddress,
  findAdUser,
} = require('../services/UserServices');
const UserView = require('../views/UserViews');

exports.registerAnUser = asyncWrapper(async (req, res) => {
  if (await checkUser(req.user.uid)) {
    return res.fail(400, {
      name: 'RegisterError',
      message: 'User already registered!',
    });
  }

  await addNewUser(req.user);
  await addUserDetail(req.user);
  await addUserAddress(req.user);

  const response = new UserView(await findAdUser(req.user));
  return res.ok(201, response);
});
