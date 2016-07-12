const User = require('./user.model');

module.exports = {
  get,
  post
};

function get(req, res) {
  User.findAll()
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err));
}

function post(req, res) {
  User.create(req.body)
    .then(newUser => res.status(201).send(newUser))
    .catch(err => res.status(500).send(err));
}
