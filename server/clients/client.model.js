const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize').db;

const Client = sequelize.define('client', {
  name: { type: Sequelize.STRING, allowNull: false },
  clientId: {
    type: Sequelize.UUID,
    allowNull: false,
    unique: true,
    defaultValue: Sequelize.UUIDV4
  },
  clientSecret: Sequelize.STRING,
  callbackUrl: { type: Sequelize.STRING, allowNull: false }
});

// Sync with DB
Client.sync();

module.exports = Client;
