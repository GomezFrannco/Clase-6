const { config } = require("../config.sql.js");

const _knex = require("knex");

const knex = _knex(config);

module.exports = {
  knex,
};