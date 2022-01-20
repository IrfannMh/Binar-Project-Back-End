const { handleGetRoot } = require('./controllers/MainController');

module.exports = (router) => {
  router.get('/', handleGetRoot);

  return router;
};
