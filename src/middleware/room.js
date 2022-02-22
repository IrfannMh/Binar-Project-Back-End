const asyncWrapper = require('../plugins/asyncWrapper');
const { Rooms } = require('../models');
const { FORBIDDEN, NOT_FOUND } = require('../utils/constants');
const { checkValidUUID } = require('../utils/uuid');

const checkOwner = async ({ roomId, userId }) => {
  const room = await Rooms.findOne({
    where: {
      id: roomId,
      ownerId: userId,
    },
  });

  return room !== null;
};

exports.verifyRoomOwner = asyncWrapper(async (req, res, next) => {
  if (!checkValidUUID(req.params.id)) {
    return res.fail(404, {
      name: NOT_FOUND,
      message: 'Pleace check roomId, room not found!',
    });
  }
  const isOwner = await checkOwner({
    roomId: req.params.id,
    userId: req.user.uid,
  });

  if (!isOwner) {
    return res.fail(403, {
      name: FORBIDDEN,
      message: 'You are not the room owner!',
    });
  }
  next();
});
