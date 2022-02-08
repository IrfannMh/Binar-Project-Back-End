const admin = require('../config/firebase-config');
const asyncWrapper = require('../plugins/asyncWrapper');

const getToken = (authorizationHeader = '') => {
  const splittedHeader = authorizationHeader.split('Bearer ')[1];
  return splittedHeader;
};

const authorize = asyncWrapper(async (req, res, next) => {
  try {
    const token = getToken(req.headers.authorization);

    if (token) {
      const user = await admin.auth().verifyIdToken(token);
      req.userId = user.uid;
      next();
    }

    return res.fail(403, {
      name: 'FORBIDDEN',
      message: 'You are not authenticated!',
    });
  } catch (err) {
    return res.fail(401, {
      name: 'UNAUTHORIZED',
      message: 'Token is not valid!',
    });
  }
});

module.exports = authorize;
