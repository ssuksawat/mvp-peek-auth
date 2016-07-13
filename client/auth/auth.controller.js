module.exports = AuthCtrl;

function AuthCtrl($location, AuthService) {
  var vm = this;

  vm.verified = false;
  vm.credentials = { username: '', passcode: ''};
  vm.error = '';
  vm.submitUser = submitUser;
  vm.submitPasscode = submitPasscode;

  /***** PUBLIC *****/

  function submitUser() {
    AuthService.submitUser(vm.credentials, $location.search().client_id)
      .then(() => vm.verified = true)
      .catch(() => vm.error = 'User does not exist.');
  }

  function submitPasscode() {
    AuthService.submitPasscode(vm.credentials, $location.search().client_id)
      .then(data => window.location.href = data.callbackUrl)
      .catch(() => vm.error = 'User does not exist.');
  }

}
