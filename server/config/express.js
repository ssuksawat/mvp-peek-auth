const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

module.exports = (app, config) => {
  app.use(morgan(config.LOG_LEVEL));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(config.rootPath + '/public'));
};
