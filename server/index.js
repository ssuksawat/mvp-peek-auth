const express = require('express');

const app = express();
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

require('./config/sequelize').init(config);
require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port, () => {
  console.log(`Listening on PORT: ${config.port}`);
});

module.exports = app;
