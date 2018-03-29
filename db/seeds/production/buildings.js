const historicBuildings = require('../../../historic_buildings_data.json');

exports.seed = (knex, Promise) => {
  return knex('buildings').del()
    .then( () => knex('districts').del())
    .then( () => {
      return Promise.all([
        knex('districts').insert(
          historicBuildings.reduce((dists, building) => {
            if (!dists.find( dist => dist.name === building['HISTORIC_DIST'])) {
              return [...dists, {name: building['HISTORIC_DIST']}]
            } else {
              return dists
            }
          }, [])
          , 'id')
        .then( district => {
          return knex('buildings').insert(
            historicBuildings.map( building => { 
              const {LDMK_NUM, LDMK_NAME, AKA_NAME, ORD_NUM, ORD_YEAR,
                ADDRESS_LINE1, ADDRESS_LINE2, SITUS_NUM, SITUS_DIR,
                SITUS_ST, SITUS_TYPE, STATE_HIST_NUM, YEAR_BUILT, ARCH_BLDR,
                DOCUMENT, PHOTO_LINK, NOTES, GIS_NOTES, DESCRIPTION, ADDRESS_ID } = building;

              return {
                ldmk_num: LDMK_NUM,
                ldmk_name: LDMK_NAME,
                aka_name: AKA_NAME,
                ord_num: ORD_NUM,
                ord_year: ORD_YEAR,
                address_line1: ADDRESS_LINE1,
                address_line2: ADDRESS_LINE2,
                situs_num: SITUS_NUM,
                situs_dir: SITUS_DIR,
                situs_st: SITUS_ST,
                situs_type: SITUS_TYPE,
                state_hist_num: STATE_HIST_NUM,
                year_built: YEAR_BUILT,
                arch_bldr: ARCH_BLDR,
                document: DOCUMENT,
                photo_link: PHOTO_LINK,
                notes: NOTES,
                gis_notes: GIS_NOTES,
                description: DESCRIPTION,
                address_id: ADDRESS_ID,
                historic_dist: knex('districts')
                  .where('name', building['HISTORIC_DIST'])
                  .select('id')
              }
            })
          )
        })
      ])
    })
}
