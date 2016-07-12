const Client = require('../clients/client.model');
const User = require('../users/user.model');
const AccessToken = require('../tokens/access-token.model');
const SigninToken = require('../tokens/signin-token.model');
const generator = require('../utils/generator');
const send = require('../utils/send');
const moment = require('moment');
const Promise = require('bluebird').Promise;
const jwt = require('jsonwebtoken');
const verify = Promise.promisify(jwt.verify, {context: jwt});


const config = require('../config/config');
const loginUrl = config.loginUrl;

module.exports = {
  redirectToLogin,
  submitUser,
  login,
  verifyToken
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

function login(req, res) {
  const clientId = req.query.client_id;
  const username = req.params.username;
  const token = req.body.passcode;

  SigninToken.findOne({where: {token, clientId, username}})
    .then(sToken => {
      if (!sToken) { throw new Error('Token does not exist.'); }
      if (sToken.status === 'EXPIRED' || Date.now() >= sToken.expiration) {
        sToken.status = 'EXPIRED';
        sToken.save();
        throw new Error('Your sign-in token has expired. Please request a new token.');
      } else {
        // Expires Token
        sToken.status = 'EXPIRED';
        sToken.save();
        // Create and return Access Token
        const payload = {username, clientId};
        return generator.getJwt(payload, config.jwtSecret)
          .then(jwt => AccessToken.create({token: jwt, username, clientId}));
      }
    })
    .then(newToken => {
      return Client.findOne({where: {clientId}})
        .then(client => {
          console.log('Redirect to: ', client.callbackUrl + `?access_token=${newToken.token}`);
          res.redirect(client.callbackUrl + `?access_token=${newToken.token}`);
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({message: err.message});
    });
}

function verifyToken(req, res) {
  const token = req.query.access_token;
  if (!token) {
    return res.status(400).send({message: '"access_token" is required'});
  }
  verify(token, config.jwtSecret)
    .then(decoded => {
      return AccessToken.findOne({where: {
        token,
        clientId: decoded.clientId,
        username: decoded.username
      }});
    })
    .then(aToken => {
      if (!aToken) { return res.status(401).send({message: 'Invalid token.'}) }
      if (Date.now() >= aToken.expiration) {
        aToken.status = 'EXPIRED';
        aToken.save();
        res.status(401).send({message: 'Expired token.'});
      } else {
        // Refresh expiration date
        aToken.expiration = moment().add(7, 'd');
        aToken.save();
        res.send(200);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({message: err.message});
    });
}
