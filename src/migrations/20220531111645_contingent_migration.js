/* eslint-disable no-undef */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("contingent", (t) => {
        t.bigIncrements('id').primary();
        t.string('login', 100);
        t.string('surname', 100);
        t.string('name', 100);
        t.string('secname', 100);
        t.string('group', 100);
        t.date('birthday', 100);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("contingent");
};
