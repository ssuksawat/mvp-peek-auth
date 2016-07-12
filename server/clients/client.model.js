const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize').db;
const generator = require('../utils/generator');

const Client = sequelize.define('client', {
  name: { type: Sequelize.STRING, allowNull: false },
  clientId: { type: Sequelize.STRING, allowNull: false, unique: true },
  clientSecret: Sequelize.STRING,
  callbackUrl: { type: Sequelize.STRING, allowNull: false }
});

Client.beforeCreate(user => user.clientId = generator.getUUID());

// Sync with DB
Client.sync({force: true});

module.exports = Client;
