const UserRouter = require('../users/user.routes');

module.exports = (app) => {
  app.use('/v1', UserRouter);
};
