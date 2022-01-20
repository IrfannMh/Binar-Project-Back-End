const express = require("express");
const configure = require("./config/server");

const server = express();

module.exports = configure(server);
