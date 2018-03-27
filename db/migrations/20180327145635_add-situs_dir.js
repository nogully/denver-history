exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('buildings', function(table) {
      table.string('situs_dir')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('buildings', (table) => {
      table.dropColumn('situs_dir');
    })
  ]);
};