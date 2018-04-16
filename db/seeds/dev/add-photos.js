const photos = require('../../../photos_downtown.json')

exports.seed = function(knex, Promise) {
  return knex('buildings').select('description').del()
    .then(() => knex('buildings').select('photo_link').del())
    .then((buildings) => {
      return Promise.all(
        photos.map(({ DESCRIPTION, LDMK_NUM, PHOTO_LINK }) => {
          return knex('buildings').where('ldmk_num', LDMK_NUM).update({"photo_link" : PHOTO_LINK, 
            "description" : DESCRIPTION  })
      }))
    })
    .then(updated => {
      console.log('success!')
    })
    .catch(error => console.log(error))
  
      
};
