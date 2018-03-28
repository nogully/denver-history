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
  response.send('Ready to explore?');
});

// DISTRICTS ---------------------------

app.get('/api/v1/districts', (request, response) => {
  database('districts').select()
    .then(districts => {
      response.status(200).json(districts);
    })
    .catch(error => {
      response.status(500).json({error});
    })
})

app.get('/api/v1/districts/:id', (request, response) => {
  database('districts').where('id', request.params.id).select()
    .then(district => {
      if (district) {
        response.status(200).json(district); 
      } else {
        response.status(404).send({ error: 'That district does not exist'});
      }
    })
    .catch(error => {
      response.status(500).json({error});
    })
})


app.get('/api/v1/districts/:id/buildings', (request, response) => {
  database('buildings').where('historic_dist', request.params.id).select()
    .then(districts => {
      response.status(200).json(districts);
    })
    .catch(error => {
      response.status(500).json(districts);
    })
})

// BUILDINGS ---------------------------------------

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
        return response.status(200).json(result)
      } else {
        return response.status(404).send({error: 'That building does not exist'})
      }
    })
    .catch( error => {
      response.status(500).json({error})
    })
})

app.patch('/api/v1/buildings/:id/description', (request, response) => {
  const { id } = request.params;
  const { description } = request.body;

  if ( !description || !description.length) {
    return response.status(422).send({error: 'Description is required'})
  }

  database('buildings').where('id', id).select()
    .then( result => {
      if (result.length) {
        database('buildings').where('id', id).update({description})
          .then(rows => {
             return response.status(200).json('description changed successfully')
          })
      } else {
        return response.status(404).send({error: 'That building does not exist'})
      }
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;