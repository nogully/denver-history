
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('buildings', table => {
      table.dropColumn('photo_link')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('buildings', table => {
      table.string('photo_link');
    })
  ])
};
