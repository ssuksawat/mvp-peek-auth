const uuid = require('node-uuid');

module.exports = {
  getUUID,
  getDigits
};

function getUUID() {
  return uuid.v4();
}

function getDigits() {
  return Math.floor(Math.random()*9000) + 1000;
}
