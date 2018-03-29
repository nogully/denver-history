const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const secretKey = process.env.SECRET_KEY || 'pandapuppies';

app.locals.title = 'Denver History';

app.use(express.static('public'));

// AUTHENTICATION ----------------------

app.post('/authenticate', (request, response) => {
  const payload = request.body;
  console.log(payload);

  for (let requiredParameter of ['email', 'appName']) {
    if (!payload[requiredParameter]) {
      return response.status(422)
        .send({
          error: `Expected format: {email: <string>, appName: <string> }. You're missing an ${requiredParameter} property.`})
    }
  }
  const token = jwt.sign(payload, secretKey);
  return response.status(201).json({token});
})
 
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
      if (district.length) {
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
  const { id } = request.params;

  database('buildings').where('historic_dist', id).select()
    .then(buildings => {
      if (buildings.length) {
        response.status(200).json(buildings);
      } else {
        response.status(404).send({ error: 'No buildings found'});
      }
    })
    .catch(error => {
      response.status(500).json({error});
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
    .catch( error => {
      response.status(500).json({error})
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;