
exports.seed = (knex, Promise) => {
  return knex('buildings').del()
    .then( () => knex('districts').del())
    .then( () => {
      return Promise.all([
        knex('districts').insert([
          { 
            name: 'Wyman'
          },
          {
            name: 'East 7th Avenue'
          }
        ], 'id')
        .then( district => {
          return knex('buildings').insert([
            {
              ldmk_num: 93,
              ldmk_name: '1437 High Street',
              aka_name: 'Watson House',
              ord_num: 293,
              ord_year: 1976,
              address_line1: '1437 High Street',
              address_line2: null,
              situs_num: 1437,
              situs_dir: null,
              situs_st: 'High',
              situs_type: 'ST',
              historic_dist: district[0],
              state_hist_num: '5DV.5811',
              year_built: 1894,
              arch_bldr: null,
              document: null,
              photo_link: 'yes',
              notes: null,
              gis_notes: null,
              description: null,
              address_id: null
            },
            {
              ldmk_num: 94,
              ldmk_name: 'Kerr House',
              aka_name: null,
              ord_num: 360,
              ord_year: 1976,
              address_line1: '1900 E. 7th Avenue Parkway',
              address_line2: null,
              situs_num: 1900,
              situs_dir: 'E',
              situs_st: '7th Avenue',
              situs_type: 'PKY',
              historic_dist: district[1],
              state_hist_num: '5DV.751',
              year_built: 1925,
              arch_bldr: null,
              document: null,
              photo_link: 'yes',
              notes: null,
              gis_notes: null,
              description: null,
              address_id: null
            }
          ])
        })
      ])
    })
}
