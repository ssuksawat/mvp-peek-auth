const Client = require('../clients/client.model');
const User = require('../users/user.model');
const AccessToken = require('../tokens/access-token.model');
const SigninToken = require('../tokens/signin-token.model');

const env = process.env.NODE_ENV || 'development';
const loginUrl = require('../config/config')[env].loginUrl;

module.exports = {
  redirectToLogin,
  submitUser,
  login
};

function redirectToLogin(req, res) {
  const clientId = req.query.client_id;
  Client.findOne({
    where: { clientId }
  })
  .then(() => res.redirect(loginUrl + '?' + clientId))
  .catch(err => {
    console.error(err);
    res.status(500).send({error: 'Cannot find client with provided "client_id"'});
  });
}

function submitUser() {

}

function login() {

}
