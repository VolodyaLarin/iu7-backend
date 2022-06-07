/* eslint-disable no-undef */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("users", (t) => {
        t.bigIncrements('id').primary();
        t.string('token', 255);
        t.string('login', 100);
        t.string('contingentLogin', 100);
        t.string('photo', 255);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTableIfExists("users");
  
};
