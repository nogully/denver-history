
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('buildings', (table) => {
      table.decimal('lon', 15, 12);
      table.decimal('lat', 15, 13);
    })
  ]) 
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('buildings', (table) => {
      table.dropColumn('lat')
      table.dropColumn('lon')
    })
  ]);
};
