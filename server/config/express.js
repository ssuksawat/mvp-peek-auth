const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

module.exports = (app, config) => {
  app.use(morgan(config.LOG_LEVEL));
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
};