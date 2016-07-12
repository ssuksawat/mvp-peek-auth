const path = require('path');
const rootPath = path.join(__dirname, '../..');

const env = process.env.NODE_ENV || 'development';
const config = {
  development: {
    rootPath: rootPath,
    db: process.env.DATABASE_URL || 'mysql://root@localhost/peekdb',
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'dev',
    secret: process.env.APP_SECRET || 'cool cats love coffee',
    sendgridKey: process.env.SENDGRID_KEY || '',
    jwtSecret: process.env.JWT_SECRET || 'super secret stuff', //TODO: Refactor to dynamically gen secret
    loginUrl: 'http://localhost:3000/login'
  },
  production: {
    rootPath: rootPath,
    db: process.env.DATABASE_URL,
    port: process.env.PORT || 80,
    logLevel: process.env.LOG_LEVEL || 'tiny',
    secret: process.env.APP_SECRET || 'cool cats love coffee',
    sendgridKey: process.env.SENDGRID_KEY || '',
    jwtSecret: process.env.JWT_SECRET || 'super secret stuff' //TODO: Refactor to dynamically gen secret
  }
};

module.exports = config[env];
