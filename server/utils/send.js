const Promise = require('bluebird').Promise;
const sendGrid = require('sendGrid');
const textbelt = require('textbelt');

const sendText = Promise.promisify(textbelt.sendText, { context: textbelt });

module.exports = {
  text,
  email
};

function text(phone, name, token) {
  return sendText(phone, `Hi ${name}! Your Peek code is ${token}`, 'us');
}

function email(email, name, token) {
  // TODO: set up SendGrid for email
  return Promise.resolve();
}
