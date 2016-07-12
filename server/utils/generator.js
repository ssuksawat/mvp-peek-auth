const Promise = require('bluebird').Promise;
const uuid = require('node-uuid');
const jwt = require('jsonwebtoken');

const sign = Promise.promisify(jwt.sign, {context: jwt});

module.exports = {
  getUUID,
  getDigits,
  getJwt
};

function getUUID() {
  return uuid.v4();
}

function getDigits() {
  return Math.floor(Math.random()*9000) + 1000;
}

function getJwt(info, secret) {
  return sign(info, secret, {});
}
