const usersRouter = require('./usersRoutes');
const messagesRouter = require('./messagesRoutes');

module.exports = (app) => {
  app.use('/', usersRouter);
  app.use('/', messagesRouter);
};
