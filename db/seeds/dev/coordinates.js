const coordinates = require('../../../landmark_coordinates.json')

exports.seed = function(knex, Promise) {
  return knex('buildings')
    .then((buildings) => {
      return Promise.all(
        coordinates.map(({ LAT, LON, LDMK_NUM, PHOTO_LINK, DESCRIPTION }) => {
          return knex('buildings').where('ldmk_num', LDMK_NUM)
            .update({
              "lat" : LAT, 
              "lon" : LON, 
              "photo_link" : PHOTO_LINK,
              "description" : DESCRIPTION
            })
        }))
      })
    .then(updated => {
      console.log('Added columns successfully')
    })
    .catch(error => console.log(error))
  
      
};
