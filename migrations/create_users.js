// migrations/create_users.js
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username');
      table.string('address');
      table.string('tel');
      table.string('email');
      table.integer('perfil_id');
      table.string('password');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };