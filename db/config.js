const dotenv = require('dotenv');

dotenv.config();
const {
  DATABASE_NAME = 'LepasAja',
  DATABASE_USERNAME = null,
  DATABASE_PASSWORD = null,
  DATABASE_HOST = 'localhost',
} = process.env;

module.exports = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: `${DATABASE_NAME}_development`,
    host: DATABASE_HOST,
    dialect: 'postgres',
  },
  test: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: `${DATABASE_NAME}_test`,
    host: DATABASE_HOST,
    dialect: 'postgres',
  },
  production: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
