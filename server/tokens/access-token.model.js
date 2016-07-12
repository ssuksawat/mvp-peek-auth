const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize').db;
// const User = require('../users/user.model');
// const Client = require('../clients/client.model');

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
// AccessToken.belongsTo(User, { foreignKey: 'username' });
// AccessToken.belongsTo(Client, { foreignKey: 'clientId' });

AccessToken.beforeCreate(token => token.expiration = moment().add(7, 'd'));

AccessToken.sync({force: true});


module.exports = AccessToken;
