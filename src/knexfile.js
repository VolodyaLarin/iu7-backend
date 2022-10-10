/* eslint-disable no-undef */
// Update with your config settings.


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    "client": require('knex-firebird-dialect').default,
    "connection": {
      "host": "127.0.0.1",
      "port": 3050,
      "user": "SYSDBA",
      "password": "somepassword",
      "database": "/db/test_x.fdb",
      "lowercase_keys": true,
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
