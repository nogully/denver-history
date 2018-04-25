
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('buildings', table => {
      table.specificType('photo_link', 'text[]');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('buildings', table => {
      table.dropColumn('photo_link')
    })
  ])
};
