const path = require('path');
const rootPath = path.join(__dirname, '../..');

module.exports = {
  development: {
    rootPath: rootPath,
    db: process.env.DATABASE_URL || 'mysql://localhost:3306/',
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'dev',
    secret: process.env.APP_SECRET || 'cool cats love coffee',
    sendgridKey: process.env.SENDGRID_KEY || ''
  },
  production: {
    rootPath: rootPath,
    db: process.env.DATABASE_URL,
    port: process.env.PORT || 80,
    logLevel: process.env.LOG_LEVEL || 'tiny',
    secret: process.env.APP_SECRET || 'cool cats love coffee',
    sendgridKey: process.env.SENDGRID_KEY || ''
  }
}
