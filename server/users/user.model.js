const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize').db;

const User = sequelize.define('user', {
  fullname: { type: Sequelize.STRING, allowNull: false },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: { type: Sequelize.STRING, allowNull: false },
  phoneNumber: Sequelize.STRING
});

// Sync table
User.sync();

module.exports = User;
