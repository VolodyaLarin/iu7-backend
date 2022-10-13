/* eslint-disable no-undef */
// Update with your config settings.


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    "client": "postgresql",
    "connection": {
      "database": "postgres",
      "user":     "postgres",
      "password": "1234"
    }
  },
};
