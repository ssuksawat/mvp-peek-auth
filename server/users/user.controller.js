const User = require('./user.model');

module.exports = {
  get
};

function get(req, res) {
  User.findAll()
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err));
}
