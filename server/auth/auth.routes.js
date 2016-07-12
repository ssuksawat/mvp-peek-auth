const AuthRouter = require('express').Router();
const AuthCtrl = require('./auth.controller');

AuthRouter.route('/auth')
  .get(AuthCtrl.redirectToLogin);

AuthRouter.route('/login')
  .post(AuthCtrl.submitUser);

AuthRouter.route('/login/:user')
  .post(AuthCtrl.login);


module.exports = AuthRouter;
