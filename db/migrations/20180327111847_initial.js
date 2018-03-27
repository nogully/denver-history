exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('buildings', function(table) {
      table.increments('id').primary();
      table.integer('LDMK_NUM');
      table.string('LDMK_NAME');
      table.string('AKA_NAME');
      table.integer('ORD_NUM');
      table.integer('ORD_YEAR');
      table.string('ADDRESS_LINE1');
      table.string('ADDRESS_LINE2');
      table.string('HISTORIC_DIST');
      table.foreign('HISTORIC_DIST')
        .references('districts.name');
      table.string('STATE_HIST_NUM');
      table.string('YEAR_BUILT');
      table.string('ARCH_BLDR');
      table.string('DOCUMENT');
      table.string('PHOTO_LINK');
      table.string('NOTES');
      table.string('GIS_NOTES');
      table.string('DESCRIPTION');
      table.integer('ADDRESS_ID');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('districts', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('footnotes'),
    knex.schema.dropTable('papers')
  ]);
};