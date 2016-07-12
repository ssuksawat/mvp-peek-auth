const app = require('angular').module('peek.auth', [
  /* HTML Templates */
  require('./login.html'),
  require('./signup.html')
]);

const AuthRoutes = require('./auth.routes');
const AuthCtrl = require('./auth.controller');
const AuthService = require('./auth.service');

app.config(['$stateProvider', AuthRoutes]);
app.controller('AuthCtrl', [ '$state', 'AuthService', AuthCtrl]);
app.factory('AuthService', [ '$http', '$q', '$log', AuthService]);

module.exports = app.name;
