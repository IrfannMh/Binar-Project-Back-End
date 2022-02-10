const { v4: uuidv4 } = require('uuid');

exports.getTimestamp = (time) => Math.round(time.getTime() / 1000);

exports.createUUID = () => uuidv4();
