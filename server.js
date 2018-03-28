const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Denver History';

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('Oh hi');
});

app.get('/api/v1/buildings', (request, response) => {
  database('buildings').select()
    .then( buildings => {
      response.status(200).json(buildings);
    })
    .catch( error => {
      response.status(500).json({error});
    })
});

app.get('/api/v1/buildings/:id', (request, response) => {
  const { id } = request.params;

  database('buildings').where('id', id).select()
    .then( result => {
      if (result.length) {
        return response
          .status(200)
          .json(result)
      } else {
        return response
          .status(404)
          .send({error: 'That building is not in the database'})
      }
    })
    .catch( error => {
      response.status(500).json({error})
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;