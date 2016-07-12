const angular = require('angular');
const uiRouter = require('angular-ui-router');

const app = angular.module('peek', [
  /* Dependencies */
  uiRouter,

  /* Components */
  require('./auth')
]);

/* App Config */
require('./app.routes')(app);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['peek']);
});
