const Client = require('./client.model');

module.exports = {
  get,
  post
};

function get(req, res) {
  Client.findAll()
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err));
}

function post(req, res) {
  Client.create(req.body)
    .then(newClient => res.status(201).send(newClient))
    .catch(err => res.status(500).send(err));
}
