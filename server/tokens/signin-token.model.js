const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize').db;
const moment = require('moment');

const SigninToken = sequelize.define('signinToken', {
  token: { type: Sequelize.STRING, allowNull: false, unique: true },
  clientId: { type: Sequelize.UUID, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: false },
  expiration: { type: Sequelize.DATE },
  attempt: { type: Sequelize.INTEGER, defaultValue: 0 },
  status: {
    type: Sequelize.ENUM('ACTIVE', 'EXPIRED'),
    defaultValue: 'ACTIVE'
  }
});

SigninToken.beforeCreate(token => token.expiration = moment().add(60, 's'));

SigninToken.sync({force: true});


module.exports = SigninToken;
