const { User, UserDetail, UserAddress } = require('../models');
const { createUUID } = require('./GlobalServices');

const splitName = (name) => {
  const fullname = name.split(' ');
  let lastname = '';
  for (let i = 1; i < fullname.length; i++) {
    const str = fullname[i];
    lastname = lastname.concat(' ', str);
  }
  const splitedFullname = [fullname[0].trim(), lastname.trim()];
  return splitedFullname;
};

exports.checkUser = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

exports.addNewUser = async (user) => {
  const { email, uid, email_verified, picture } = user;
  const newUser = await User.create({
    id: uid,
    email,
    emailVerified: email_verified,
    photoUrl: picture,
  });

  return newUser;
};

exports.addUserDetail = async (user) => {
  const { uid, name } = user;
  const fullName = splitName(name);
  const newUserDetail = await UserDetail.create({
    id: createUUID(),
    displayName: name,
    userId: uid,
    firstname: fullName[0],
    lastname: fullName[1],
  });

  return newUserDetail;
};

exports.addUserAddress = async (user) => {
  const { uid } = user;
  const newUserAddress = await UserAddress.create({
    id: createUUID(),
    userId: uid,
  });

  return newUserAddress;
};

exports.findAdUser = async (user) => {
  const { uid } = user;
  const userDetail = await User.findOne({
    where: {
      id: uid,
    },
    include: [{ model: UserAddress }, { model: UserDetail }],
  });

  return userDetail;
};
