module.exports = AuthCtrl;

function AuthCtrl($location, $interval, AuthService) {
  var vm = this;

  vm.verified = false;
  vm.credentials = { username: '', passcode: ''};
  vm.error = '';
  vm.submitUser = submitUser;
  vm.submitPasscode = submitPasscode;

  /***** PUBLIC *****/

  function submitUser() {
    AuthService.submitUser(vm.credentials, $location.search().client_id)
      .then(() => {
        vm.verified = true;
        startTimer();
      })
      .catch(() => vm.error = 'User does not exist.');
  }

  function submitPasscode() {
    AuthService.submitPasscode(vm.credentials, $location.search().client_id)
      .then(data => window.location.href = data.callbackUrl)
      .catch(() => vm.error = 'User does not exist.');
  }

  /***** PRIVATE *****/

  function startTimer() {
    vm.secondsLeft = 60;

    const interval = $interval(() => {
      vm.secondsLeft--;
      if (vm.secondsLeft <= 0) {
        $interval.cancel(interval);
        vm.verified = false;
      }
    }, 1000);
  }
}
