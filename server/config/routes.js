const AuthRouter = require('../auth/auth.routes');
const ClientRouter = require('../clients/client.routes');
const UserRouter = require('../users/user.routes');

module.exports = (app) => {
  app.use('/v1', ClientRouter);
  app.use('/v1', UserRouter);
  app.use('/v1', AuthRouter);
};
