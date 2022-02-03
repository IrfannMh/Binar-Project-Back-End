const server = require('./src/server');
const models = require('./src/models');

const { PORT = 8000 } = process.env;

models.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.clear();
    console.log(`Listening on port ${PORT}`);
  });
});
