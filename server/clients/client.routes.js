const ClientRouter = require('express').Router();
const ClientCtrl = require('./client.controller');

ClientRouter.route('/clients')
  .get(ClientCtrl.get);


module.exports = ClientRouter;
