/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
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

const checkAuth = (request, response, next) => {
  const { token } = request.body;
  if (!token) {
    return response.status(403).send({ error: 'You must be authorized to access this endpoint.' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const { email } = decoded;

    if (email.toLowerCase().includes('@turing.io')) {
      next();
    } else {
      return response.status(403).send({ error: 'Your email is not authorized' });
    }
  } catch (error) {
    return response.status(403).send({ error: 'Invalid token' });
  }
};

app.post('/authenticate', (request, response) => {
  const payload = request.body;
  const requiredParameters = ['email', 'appName'];

  requiredParameters.forEach((param) => {
    if (!payload[param]) {
      return response.status(422)
        .send({ error: `Expected format: {email: <string>, appName: <string> }. You're missing an ${param} property.` });
    }
  });
  const token = jwt.sign(payload, secretKey);
  return response.status(201).json({ token });
});

// DISTRICTS ---------------------------

app.get('/api/v1/districts', (request, response) => {
  database('districts').select()
    .then(districts => response.status(200).json(districts))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/districts/:id', (request, response) => {
  database('districts').where('id', request.params.id).select()
    .then((district) => {
      if (district.length) {
        response.status(200).json(district);
      } else {
        response.status(404).send({ error: 'That district does not exist' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/districts/:id/buildings', (request, response) => {
  const { id } = request.params;

  database('buildings').where('historic_dist', id).select()
    .then((buildings) => {
      if (buildings.length) {
        response.status(200).json(buildings);
      } else {
        response.status(404).send({ error: 'No buildings found' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/districts/:id/buildings/map', (request, response) => {
  const { id } = request.params;

  database('buildings').where('historic_dist', id).select()
    .then((buildings) => {
      if (buildings.length) {
        const map = buildings.map(({
          lat,
          lon,
          ldmk_name,
          aka_name,
          year_built,
          ldmk_num,
          id,
        }) => ({
          lat,
          lon,
          ldmk_name,
          aka_name,
          year_built,
          ldmk_num,
          id,
        }));

        response.status(200).json(map);
      } else {
        response.status(404).send({ error: 'No buildings found' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});


app.post('/api/v1/districts', checkAuth, (request, response) => {
  const { name } = request.body;

  if (!name) {
    return response.status(422).send({ error: 'Please name your district' });
  }

  database('districts').insert({ name }, 'id')
    .then((district) => {
      response.status(201).json(`You created a district, ${name} with an ID of ${district[0]}`);
    })
    .catch(error => response.status(500).send({ error }));
});

app.delete('/api/v1/districts', checkAuth, (request, response) => {
  const { id } = request.body;
  if (!id) {
    return response.status(422).send({ error: 'Please include the id of the district to delete' });
  }

  database('districts').where('id', id).del()
    .then((districtId) => {
      if (districtId) {
        response.status(202).json(`You deleted district ${id}`);
      } else {
        response.status(404).send({ error: `Could not find district with id ${id}` });
      }
    })
    .catch((error) => {
      response.status(500).send({ error: error.message });
    });
});

// SEARCH ------------------------------------------

app.get('/api/v1/search', (request, response) => {
  const key = Object.keys(request.query)[0];
  const value = Object.values(request.query)[0];

  database('buildings').where(key, value).select()
    .then((result) => {
      if (result.length) {
        response.status(200).json(result);
      } else {
        response.status(404).json({ error: `Property '${key}' with value '${value}' not found.` });
      }
    })
    .catch(error => response.status(500)
      .send({ 'Database error': `Search parameters must be correctly defined. SQL says: ${error.message}. Please see documentation.` }));
});

// BUILDINGS ---------------------------------------

app.get('/api/v1/buildings', (request, response) => {
  database('buildings').select()
    .then(buildings => response.status(200).json(buildings))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/buildings/:id', (request, response) => {
  const { id } = request.params;

  database('buildings').where('id', id).select()
    .then((result) => {
      if (result.length) {
        response.status(200).json(result);
      } else {
        response.status(404).send({ error: 'That building does not exist' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/buildings/:id/description', checkAuth, (request, response) => {
  const { id } = request.params;
  const { description } = request.body;

  if (!description || !description.length) {
    return response.status(422).send({ error: 'Description is required' });
  }

  database('buildings').where('id', id).select()
    .then((result) => {
      if (result.length) {
        database('buildings').where('id', id).update({ description })
          .then(() => response.status(200).json('description changed successfully'));
      } else {
        return response.status(404).send({ error: 'That building does not exist' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/buildings/:id/aka_name', checkAuth, (request, response) => {
  const { id } = request.params;
  const { akaName } = request.body;

  if (!akaName || !akaName.length) {
    return response.status(422).send({ error: 'aka_name is required' });
  }

  database('buildings').where('id', id).select()
    .then((result) => {
      if (result.length) {
        database('buildings').where('id', id).update({ aka_name: akaName })
          .then(() => response.status(200).json(`aka_name changed successfully on ${id}`));
      } else {
        return response.status(404).send({ error: 'That building does not exist' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/buildings', checkAuth, (request, response) => {
  const payload = request.body;
  delete payload.token;
  const desiredParams = ['ldmk_num', 'ldmk_name', 'aka_name', 'ord_num', 'ord_year', 'address_line1', 'address_line2', 'situs_num', 'situs_dir', 'situs_st', 'situs_type', 'state_hist_num', 'year_built', 'arch_bldr', 'document', 'photo_link', 'notes', 'gis_notes', 'description', 'address_id', 'historic_dist'];
  Object.keys(payload).forEach((key) => {
    if (!desiredParams.includes(key)) {
      return response.status(422)
        .send({
          error: `Expected keys are: 'ldmk_num', 'ldmk_name', 'aka_name', 'ord_num', 'ord_year', 'address_line1', 'address_line2', 'situs_num', 'situs_dir', 'situs_st', 'situs_type', 'state_hist_num', 'year_built', 'arch_bldr', 'document', 'photo_link', 'notes', 'gis_notes', 'description', 'address_id', 'historic_dist'. You entered a ${key} property.`,
        });
    }
  });
  database('buildings').insert(payload, 'id')
    .then(building => response.status(201)
      .json(`You made a building with an id of ${building[0]}`))
    .catch(error => response.status(500).send({ error }));
});

app.delete('/api/v1/buildings/', checkAuth, (request, response) => {
  const { id } = request.body;
  if (!id) {
    return response.status(422).send({
      error: 'Please include the id of the building to delete',
    });
  }

  return database('buildings').where('id', id).del()
    .then((buildingId) => {
      if (buildingId) {
        response.status(202).json(`You deleted building ${id}`);
      } else {
        response.status(404).send({ error: `Could not find building with id ${id}` });
      }
    })
    .catch(error => response.status(500).send({ error }));
});

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
