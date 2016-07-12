const UserRouter = require('express').Router();
const UserCtrl = require('./user.controller');

UserRouter.route('/users')
  .get(UserCtrl.get);

module.exports = UserRouter;
