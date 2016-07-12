const express = require('express');

const app = express();
const config = require('./config/config');

console.log(config);

require('./config/sequelize').init(config);
require('./config/express')(app, config);
require('./config/routes')(app, config);

app.listen(config.port, () => {
  console.log(`Listening on PORT: ${config.port}`);
});

module.exports = app;
