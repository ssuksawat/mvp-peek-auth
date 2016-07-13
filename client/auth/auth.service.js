module.exports = AuthService;

function AuthService($http, $log) {
  return {
    submitUser,
    submitPasscode
  };

  function submitUser(cred, clientId) {
    return $http.post(`/v1/login?client_id=${clientId}`, { username: cred.username })
      .catch(err => $log.error(err));
  }

  function submitPasscode(cred, clientId) {
    return $http.post(`/v1/login/${cred.username}?client_id=${clientId}`, { passcode: cred.passcode })
      .then(res => res.data)
      .catch(err => $log.error(err));
  }
}
