const Client = require('../clients/client.model');
const User = require('../users/user.model');
const AccessToken = require('../tokens/access-token.model');
const SigninToken = require('../tokens/signin-token.model');
const generator = require('../utils/generator');
const send = require('../utils/send');

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

function submitUser(req, res) {
  const username = req.body.username;
  const clientId = req.query.client_id;
  let currUser;
  Client.findOne({where: { clientId }})
    .then(() => User.findOne({where: { username }}))
    .then(user => {
      currUser = user;
      const token = generator.getDigits();
      return SigninToken.create({token, clientId, username});
    })
    .then(newToken => {
      const firstName = currUser.fullname.split(' ')[0];
      if (currUser.phoneNumber) {
        return send.text(currUser.phoneNumber, firstName, newToken.token);
      } else {
        return send.email(currUser.email, firstName, newToken.token);
      }
    })
    .then(() => res.status(201).send({message: 'Token created!'}))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
}

function login() {

}
