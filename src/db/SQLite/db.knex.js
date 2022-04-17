const {config} = require("../config.sqlite.js") 

const _knex = require("knex");

const knex = _knex(config);

module.exports = {
  knex
};
