const AuthRouter = require('express').Router();
const AuthCtrl = require('./auth.controller');

AuthRouter.route('/login')
  .get(AuthCtrl.redirectToLogin)
  .post(AuthCtrl.submitUser);

AuthRouter.route('/login/:user')
  .post(AuthCtrl.login);


module.exports = AuthRouter;
