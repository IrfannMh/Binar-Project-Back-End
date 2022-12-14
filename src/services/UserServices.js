const { User, UserDetail, UserAddress } = require('../models');
const { getStandartDate } = require('../utils/time');
const { createUUID } = require('./GlobalServices');
const imagekit = require('../config/imagekit');

const splitName = (name) => {
  const fullname = name.split(' ');
  let lastname = '';
  // eslint-disable-next-line no-plusplus
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
    address: '',
    street: '',
    city: '',
    province: '',
    zipcode: 0,
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

exports.getAllUser = async () => {
  const users = await User.findAll({});
  return users;
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: UserAddress }, { model: UserDetail }],
  });
  return user;
};

exports.updateUserAddress = async (req, res) => {
  const { address, street, city, province, zipCode } = req.body;
  await UserAddress.update(
    {
      address,
      street,
      city,
      province,
      zipCode,
    },
    {
      where: {
        userId: req.params.id,
      },
    }
  );
};

exports.updateUserDetail = async (req, res) => {
  const { firstname, lastname, gender, birthday, phoneNumber } = req.body;

  await UserDetail.update(
    {
      firstname,
      lastname,
      gender,
      birthday: getStandartDate(birthday),
      phoneNumber,
    },
    {
      where: {
        userId: req.params.id,
      },
    }
  );
};

const getInfoPhotoUser = async (file) => {
  const ext = file.originalname.split('.')[1];
  const fileName = `${Date.now()}.${ext}`;

  const upload = await imagekit.upload({
    file: file.buffer.toString('base64'),
    fileName,
    folder: 'users',
  });

  return upload;
};

exports.updatePhotoUser = async (req) => {
  const { file } = req;
  const userId = req.params.id;
  const uploadProfil = await getInfoPhotoUser(file);
  await User.update(
    {
      photoUrl: uploadProfil.url,
    },
    {
      where: {
        id: userId,
      },
    }
  );
};

exports.findDetail = async (req, res) => {
  const detail = await User.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: UserAddress }, { model: UserDetail }],
  });
  return detail;
};

exports.deleteUser = async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  });
};
