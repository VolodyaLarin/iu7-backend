/* eslint-disable no-undef */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("events", (t) => {
        t.bigIncrements('id').primary();
        t.dateTime('date');
        t.string('group', 100);
        t.string('speaker', 100);
        t.string('type', 100);
        t.string('subject', 255);
        t.string('place', 255);
        t.string('theme', 255);
        t.string('description', 1024);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("events");

};
