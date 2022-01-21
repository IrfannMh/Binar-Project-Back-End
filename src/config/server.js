const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const { onLost, onError } = require('../plugins/errorHandler');
const { ok, fail, error } = require('../plugins/responseBuilder');
const appRoutes = require('../routes');

module.exports = (server) => {
  server.use(morgan('tiny'));
  server.use(express.json());

  server.response.ok = ok;
  server.response.fail = fail;
  server.response.error = error;

  appRoutes(server);

  server.use(onLost);
  server.use(onError);

  return server;
};
