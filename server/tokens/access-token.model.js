const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize').db;
const moment = require('moment');

const AccessToken = sequelize.define('accessToken', {
  token: { type: Sequelize.STRING, allowNull: false, unique: true },
  clientId: { type: Sequelize.UUID, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: false },
  expiration: { type: Sequelize.DATE },
  status: {
    type: Sequelize.ENUM('ACTIVE', 'EXPIRED'),
    defaultValue: 'ACTIVE'
  }
});

AccessToken.beforeCreate(token => token.expiration = moment().add(7, 'd'));

AccessToken.sync();


module.exports = AccessToken;
