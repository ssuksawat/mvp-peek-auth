module.exports = function (app) {
  app.config(['$urlRouterProvider', '$locationProvider', RoutesConfig]);

  function RoutesConfig($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/login");
  }
};
