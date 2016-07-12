const Client = require('./client.model');

module.exports = {
  get
};

function get(req, res) {
  Client.findAll()
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err));
}
