exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('districts', function(table) {
      table.increments('id').primary();
      table.string('name').unique();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('buildings', function(table) {
      table.increments('id').primary();
      table.float('ldmk_num');
      table.string('ldmk_name');
      table.string('aka_name');
      table.integer('ord_num');
      table.integer('ord_year');
      table.string('address_line1');
      table.string('address_line2');
      table.integer('situs_num');
      table.string('situs_st');
      table.string('situs_type');
      table.integer('historic_dist');
      table.foreign('historic_dist')
        .references('districts.id');
      table.string('state_hist_num');
      table.string('year_built');
      table.string('arch_bldr');
      table.string('document');
      table.string('photo_link');
      table.string('notes');
      table.string('gis_notes');
      table.string('description');
      table.integer('address_id');
      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('buildings'),
    knex.schema.dropTable('districts')
  ]);
};