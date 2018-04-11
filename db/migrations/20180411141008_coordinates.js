
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('buildings', (table) => {
    table.float('lon');
    table.float('lat')})
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
