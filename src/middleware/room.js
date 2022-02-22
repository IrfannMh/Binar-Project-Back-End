const asyncWrapper = require('../plugins/asyncWrapper');
const { Rooms } = require('../models');
const { FORBIDDEN } = require('../utils/constants');

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
