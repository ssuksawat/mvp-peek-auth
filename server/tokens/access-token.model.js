const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize').db;
const User = require('../users/user.model');

const AccessToken = sequelize.define('accessToken', {
  token: { type: Sequelize.STRING, allowNull: false, unique: true },
  clientId: { type: Sequelize.STRING, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: false },
  expiration: { type: Sequelize.DATE },
  status: {
    type: Sequelize.STRING,
    values: ['ACTIVE', 'EXPIRED']
  }
});
AccessToken.belongsTo(User);

AccessToken.beforeCreate(token => token.expiration = moment().add(7, 'd'));

AccessToken.sync({force: true});


module.exports = AccessToken;
