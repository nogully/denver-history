const coordinates = require('../../../landmark_coordinates.json')

exports.seed = function(knex, Promise) {
  return Promise.all(
    return coordinates.map(({ LAT, LON, LDMK_NUM }) => {
      knex.select('buildings').where('ldmk_num', LDMK_NUM)
        .update({
          "lat" : LAT, 
          "lon" : LON
        })
    });
  )
  .then(updated => {
    console.log('Added columns successfully')
    })
  .catch()
      
};
