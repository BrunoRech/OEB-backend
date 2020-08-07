require('dotenv').config();
const express = require('express');
require('express-async-errors');
const validate = require('express-validation');

const cors = require('cors');
const Joi = require('joi-i18n');
const mongoose = require('mongoose');
const Youch = require('youch');

const databaseConfig = require('../config/database');
const joiConfig = require('../config/joi');
const routes = require('./routes');


class App {
  constructor() {
    this.server = express();
    this.isDev = process.env.NODE_ENV !== 'production';

    this.middlewares();
    this.routes();
    this.database();
    this.exception();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  }

  routes() {
    this.server.use(routes);
  }

  exception() {
    Joi.addLocaleData('pt-br', joiConfig);
    Joi.setDefaultLocale('pt-br');

    this.server.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res
          .status(err.status)
          .json({ error: err.errors[0].messages[0] });
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err);
        const { message } = youch.error;
        return res.status(400).json({
          error: message,
        });
      }

      return res.status(err.status || 500).json({ error: 'Erro do Servidor' });
    });
  }
}

module.exports = new App().server;
