module.exports = AuthRoute;

function AuthRoute($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'AuthCtrl',
      controllerAs: 'auth'
    });
}
