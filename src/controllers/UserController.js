const asyncWrapper = require('../plugins/asyncWrapper');
const {
  addNewUser,
  checkUser,
  addUserDetail,
  addUserAddress,
  findAdUser,
  getAllUser,
  getUser,
  deleteUser,
  findDetail,
  updateUserDetail,
  updateUserAddress,
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

exports.handleGetAllUser = asyncWrapper(async (req, res) => {
  const users = await getAllUser();

  return res.ok(200, users);
});

exports.handleGetUser = asyncWrapper(async (req, res) => {
  const user = await getUser(req, res);

  if (!user) {
    return res.fail(404, {
      name: 'Not Found',
      message: 'User doesn"t exist',
    });
  }
  const response = new UserView(user);
  return res.ok(200, response);
});

exports.handleUpdateUser = asyncWrapper(async (req, res) => {
  const user = await getUser(req, res);
  if (!user) {
    return res.fail(404, {
      name: 'Not Found',
      message: 'User not exist',
    });
  }
  await updateUserDetail(req, res);
  await updateUserAddress(req, res);
  const update = new UserView(await findDetail(req, res));
  return res.ok(200, update);
});

exports.handleDeleteUser = asyncWrapper(async (req, res) => {
  const user = await getUser(req, res);
  if (!user) {
    return res.fail(404, {
      name: 'Not Found',
      message: 'User not exist',
    });
  }
  await deleteUser(req, res);

  return res.ok(200, {});
});
