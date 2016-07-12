const Sequelize = require('sequelize');

module.exports = {
  init
};

function init(config) {
  const sequelize = new Sequelize(config.db, { logging: false });
  module.exports.db = sequelize;
  sequelize.authenticate()
    .then(() => console.log('Database is connected'))
    .catch(err => console.error('Error connecting to the database... ', err));
}
