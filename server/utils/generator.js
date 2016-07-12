const uuid = require('node-uuid');

module.exports = {
  getUUID
};

function getUUID() {
  return uuid.v4();
}
