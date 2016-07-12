const ClientRouter = require('express').Router();
const ClientCtrl = require('./client.controller');

ClientRouter.route('/clients')
  .get(ClientCtrl.get)
  .post(ClientCtrl.post);


module.exports = ClientRouter;
