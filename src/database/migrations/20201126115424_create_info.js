
exports.up = function(knex) {
  return knex.schema.createTable('receipts', function (table) {
    table.increments('numeration').primary();
    table.string('sender').notNullable();
    table.string('departments').array();
    table.string('receivement').nullable();
    table.decimal('value').notNullable();
    table.decimal('debit').nullable();
    table.decimal('credit').nullable();
    table.string('date').notNullable();
    table.string('referring').notNullable();
    table.string('observation').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('receipts');
};