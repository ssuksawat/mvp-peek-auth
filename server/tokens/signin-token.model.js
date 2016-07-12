const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize').db;
const User = require('../users/user.model');
const moment = require('moment');

const SigninToken = sequelize.define('signinToken', {
  token: { type: Sequelize.NUMBER, allowNull: false, unique: true },
  clientId: { type: Sequelize.STRING, allowNull: false },
  username: { type: Sequelize.STRING, allowNull: false },
  expiration: { type: Sequelize.DATE },
  attempts: { type: Sequelize.INTEGER, defaultValue: 0 },
  status: {
    type: Sequelize.STRING,
    values: ['ACTIVE', 'EXPIRED']
  }
});
SigninToken.belongsTo(User);

SigninToken.beforeCreate(token => token.expiration = moment().add(60, 's'));

SigninToken.sync({force: true});


module.exports = SigninToken;
