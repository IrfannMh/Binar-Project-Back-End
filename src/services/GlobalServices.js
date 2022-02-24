const { v4: uuidv4 } = require('uuid');

exports.getTimestamp = (time) => {
  if (!time) return null;
  return Math.round(time.getTime() / 1000);
};

exports.createUUID = () => uuidv4();
