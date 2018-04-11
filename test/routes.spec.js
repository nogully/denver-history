const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

const goodToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGZAdHVyaW5nLmlvIiwiYXBwTmFtZSI6ImFzZGYiLCJpYXQiOjE1MjIzMDQyMzF9.EaM2odpSnAwxczhGv0N1QWKt1uamWVsQDosDX3z-zj8';
const badToken = 'goldfish';
const wrongEmailToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGZAYW9sLmNvbSIsImFwcE5hbWUiOiJhc2RmIiwiaWF0IjoxNTIyMzA0MTQ4fQ.odJ51cimjG6aXKqtTBm6GAPPFta_WPZNEm-JAbP-Olg'

chai.use(chaiHttp);

before(() => {
})

beforeEach(done => {
  database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
        .then(() => {
          return database.seed.run()
            .then(() => {
              done();
            })
        })
    })
})

describe('Client Routes', () => {
  
});

describe('API Routes', () => {
  describe('POST /authenticate', () => {
    it('should return a status of 201 and a JWT', () => {
      return chai.request(server)
        .post('/authenticate')
        .send({
          email: 'asdf@turing.io',
          appName: 'coolStuff'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.an('object')
          response.body.should.have.property('token');
          response.body.token.should.include('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        })
        .catch(error => {
          throw error;
        })
    })
    it('should return a 422 error if a parameter is not provided', () => {
      return chai.request(server)
        .post('/authenticate')
        .send({
          email: 'asdf@turing.io',
          // appName
        })
        .then(response => {
          response.should.have.status(422);
          response.body.error.should.equal('Expected format: {email: <string>, appName: <string> }. You\'re missing an appName property.')
        })
        .catch(error => {
          throw error;
        })
    })
  })

  describe('Districts', () => {
    describe('GET /api/v1/districts', () => {
      it('should return all districts', () => {
        return chai.request(server)
          .get('/api/v1/districts')
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.an('array');
            response.body.length.should.equal(2);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);
            response.body[0].should.have.property('name');
            response.body[0].name.should.equal('Wyman');
          })
          .catch(error => {
            throw error;
          })
      })
    })

    describe('GET /api/v1/districts/:id', () => {
      it('should return a specific district', () => {
        return chai.request(server)
          .get('/api/v1/districts/1')
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.an('array');
            response.body.length.should.equal(1);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);
            response.body[0].should.have.property('name');
            response.body[0].name.should.equal('Wyman');
          })
          .catch(error => {
            throw error;
          })
      })
      it('should return a 404 error if the district is not found', () => {
        return chai.request(server)
          .get('/api/v1/districts/999')
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal('That district does not exist')
          })
          .catch(error => {
            throw error;
          })
      })
    })

    describe('GET /api/v1/districts/:id/buildings', () => {
      it('should return all buildings from a specific district', () => {
        return chai.request(server)
          .get('/api/v1/districts/1/buildings')
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.an('array');
            response.body.length.should.equal(1);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);
            response.body[0].should.have.property('ldmk_num');
            response.body[0].ldmk_num.should.equal(93);
            response.body[0].should.have.property('ldmk_name');
            response.body[0].ldmk_name.should.equal('1437 High Street');
            response.body[0].should.have.property('aka_name');
            response.body[0].aka_name.should.equal('Watson House');
            response.body[0].should.have.property('ord_num');
            response.body[0].ord_num.should.equal(293);
            response.body[0].should.have.property('ord_year');
            response.body[0].ord_year.should.equal(1976);
            response.body[0].should.have.property('address_line1');
            response.body[0].address_line1.should.equal('1437 High Street');
            response.body[0].should.have.property('address_line2');
            // response.body[0].address_line2.should.equal(null);
            response.body[0].should.have.property('situs_num');
            response.body[0].situs_num.should.equal(1437);
            response.body[0].should.have.property('situs_dir');
            // response.body[0].situs_dir.should.equal(null);
            response.body[0].should.have.property('situs_st');
            response.body[0].situs_st.should.equal('High');
            response.body[0].should.have.property('situs_type');
            response.body[0].situs_type.should.equal('ST');
            response.body[0].should.have.property('historic_dist');
            response.body[0].historic_dist.should.equal(1);
            response.body[0].should.have.property('state_hist_num');
            response.body[0].state_hist_num.should.equal('5DV.5811');
            response.body[0].should.have.property('year_built');
            response.body[0].year_built.should.equal('1894');
            response.body[0].should.have.property('arch_bldr');
            // response.body[0].arch_bldr.should.equal(null);
            response.body[0].should.have.property('document');
            // response.body[0].document.should.equal(null);
            response.body[0].should.have.property('photo_link');
            response.body[0].photo_link.should.equal('yes');
            response.body[0].should.have.property('notes');
            // response.body[0].notes.should.equal(null);
            response.body[0].should.have.property('gis_notes');
            // response.body[0].gis_notes.should.equal(null);
            response.body[0].should.have.property('description');
            // response.body[0].description.should.equal(null);
            response.body[0].should.have.property('address_id');
            // response.body[0].address_id.should.equal(null);
          })
          .catch( error => {
            throw error;
          });
      });
      it('should return a 404 error if there are no buildings in a district', () => {
        return chai.request(server)
          .get('/api/v1/districts/999/buildings')
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal('No buildings found')
          })
          .catch( error => {
            throw error;
          })
      })
    })

    describe('GET /api/v1/districts/:id/buildings/map', () => {
      it('should return all buildings from a specific district', () => {
        return chai.request(server)
          .get('/api/v1/districts/1/buildings/map')
          .then(response => {
            response.should.have.status(200);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);
            response.body[0].should.have.property('ldmk_name');
            response.body[0].ldmk_name.should.equal('1437 High Street');
            response.body[0].should.have.property('aka_name');
            response.body[0].aka_name.should.equal('Watson House');
            response.body[0].should.have.property('lat');
            response.body[0].should.have.property('lon');
            response.body[0].should.have.property('year_built');
            response.body[0].year_built.should.equal('1894');
            response.body[0].should.have.property('ldmk_num');
            response.body[0].ldmk_num.should.equal(93);
          })
      })
      it('should return a 404 error if there are no buildings in a district', () => {
        return chai.request(server)
          .get('/api/v1/districts/999/buildings')
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal('No buildings found')
          })
          .catch( error => {
            throw error;
          })
      })
    })

    describe('POST /api/v1/districts', () => {
      it('should create a district if the token is authorized', () => {
        return chai.request(server)
          .post('/api/v1/districts')
          .send({
            token: goodToken,
            name: 'funky town'
          })
          .then( response => {
            response.should.have.status(201);
            response.body.should.equal('You created a district, funky town with an ID of 3')
          })
          .catch( error => {
            throw error;
          })
      })
      it('should return a 422 error if the name is missing', () => {
        return chai.request(server)
          .post('/api/v1/districts')
          .send({
            token: goodToken
            // name
          })
          .then( response => {
            response.should.have.status(422);
            response.body.error.should.equal('Please name your district')
          })
          .catch(error => {
            throw error;
          })
      })
      describe('checkAuth', () => {
        it('should return a 403 error if there is no auth token', () => {
          return chai.request(server)
            .post('/api/v1/districts')
            .send({
              // token
              name: 'funky town'
            })
            .then( response => {
              response.should.have.status(403);
              response.body.error.should.equal('You must be authorized to access this endpoint.')
            })
            .catch( error => {
              throw error;
            })
        })
        it('should return a 403 error if the token is not authorized', () => {
          return chai.request(server)
            .post('/api/v1/districts')
            .send({
              token: badToken,
              name: 'funky town'
            })
            .then( response => {
              response.should.have.status(403);
              response.body.error.should.equal('Invalid token')
            })
            .catch( error => {
              throw error;
            })
        })
        it('should return a 403 error if the user is not using an authorized email', () => {
          return chai.request(server)
            .post('/api/v1/districts')
            .send({
              token: wrongEmailToken,
              name: 'funky town'
            })
            .then( response => {
              response.should.have.status(403);
              response.body.error.should.equal('Your email is not authorized');
            })
            .catch( error => {
              throw error;
            })
        })
      })
    })

    describe('DELETE /api/v1/districts', () => {
      it('should delete a district with no buildings related to it', () => {
        return chai.request(server)
          .post('/api/v1/districts')
          .send({
            token: goodToken,
            name: 'funky town'
          })
          .then(() => {
            return chai.request(server)
              .delete('/api/v1/districts')
              .send({
                token: goodToken,
                id: 3
              })
              .then(response => {
                response.should.have.status(202)
                response.body.should.equal('You deleted district 3')
              })
              .catch(error => {
                throw error;
              })
          })
          .catch(error => {
            throw error;
          })
      })
      it('should return a 404 error if the district does not exist', () => {
        return chai.request(server)
          .delete('/api/v1/districts')
          .send({
            token: goodToken,
            id: 999
          })
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal('Could not find district with id 999')
          })
          .catch(error => {
            throw error;
          })
      })
      it('should return a 422 error if there is no id provided', () => {
        return chai.request(server)
          .delete('/api/v1/districts')
          .send({
            token: goodToken,
            // id
          })
          .then(response => {
            response.should.have.status(422);
            response.body.error.should.equal('Please include the id of the district to delete')
          })
          .catch(error => {
            throw error;
          })
      })
      it('should return a 500 error if it has buildings related to it', () => {
        return chai.request(server)
          .delete('/api/v1/districts')
          .send({
            token: goodToken,
            id: 1
          })
          .then(response => {
            response.should.have.status(500);
            response.body.error.should.equal(`delete from "districts" where "id" = $1 - update or delete on table "districts" violates foreign key constraint "buildings_historic_dist_foreign" on table "buildings"`);
          })
          .catch(error => {
            throw error;
          })
      })
    })
  })

  describe('Search', () => {
    describe('GET /api/v1/search', () => {
      it('should accept search queries from the user', () => {
        return chai.request(server)
          .get('/api/v1/search?aka_name=Watson+House')
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.an('array');
            response.body.length.should.equal(1);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);
            response.body[0].should.have.property('ldmk_num');
            response.body[0].ldmk_num.should.equal(93);
            response.body[0].should.have.property('ldmk_name');
            response.body[0].ldmk_name.should.equal('1437 High Street');
            response.body[0].should.have.property('aka_name');
            response.body[0].aka_name.should.equal('Watson House');
            response.body[0].should.have.property('ord_num');
            response.body[0].ord_num.should.equal(293);
            response.body[0].should.have.property('ord_year');
            response.body[0].ord_year.should.equal(1976);
            response.body[0].should.have.property('address_line1');
            response.body[0].address_line1.should.equal('1437 High Street');
            response.body[0].should.have.property('address_line2');
            // response.body[0].address_line2.should.equal(null);
            response.body[0].should.have.property('situs_num');
            response.body[0].situs_num.should.equal(1437);
            response.body[0].should.have.property('situs_dir');
            // response.body[0].situs_dir.should.equal(null);
            response.body[0].should.have.property('situs_st');
            response.body[0].situs_st.should.equal('High');
            response.body[0].should.have.property('situs_type');
            response.body[0].situs_type.should.equal('ST');
            response.body[0].should.have.property('historic_dist');
            response.body[0].historic_dist.should.equal(1);
            response.body[0].should.have.property('state_hist_num');
            response.body[0].state_hist_num.should.equal('5DV.5811');
            response.body[0].should.have.property('year_built');
            response.body[0].year_built.should.equal('1894');
            response.body[0].should.have.property('arch_bldr');
            // response.body[0].arch_bldr.should.equal(null);
            response.body[0].should.have.property('document');
            // response.body[0].document.should.equal(null);
            response.body[0].should.have.property('photo_link');
            response.body[0].photo_link.should.equal('yes');
            response.body[0].should.have.property('notes');
            // response.body[0].notes.should.equal(null);
            response.body[0].should.have.property('gis_notes');
            // response.body[0].gis_notes.should.equal(null);
            response.body[0].should.have.property('description');
            // response.body[0].description.should.equal(null);
            response.body[0].should.have.property('address_id');
            // response.body[0].address_id.should.equal(null);
          })
          .catch(error => {
            throw error;
          });
      })
      it('should return a nice error if the query is missing parameters', () => {
        return chai.request(server)
          .get('/api/v1/search?burritos=tasty')
          .then(response => {
            response.should.have.status(500);
            response.should.be.json;
            response.body["Database error"].should.equal(`Search parameters must be correctly defined. SQL says: select * from \"buildings\" where \"burritos\" = $1 - column \"burritos\" does not exist. Please see documentation.`)
          })
          .catch(error => {
            throw error;
          });
      })
      it('should return a nice error if that database column exists but nothing matches the search', () => {
        return chai.request(server)
          .get('/api/v1/search?aka_name=Chez+Nora')
          .then(response => {
            response.should.have.status(404);
            response.should.be.json;
            response.body.error.should.equal("Property 'aka_name' with value 'Chez Nora' not found.")
          })
          .catch(error => {
            throw error;
          });
      })
    })
  })

  describe('Buildings', () => {
    describe('GET /api/v1/buildings', () => {
      it('should return all buildings', () => {
        return chai.request(server)
          .get('/api/v1/buildings')
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.an('array');
            response.body.length.should.equal(2);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);
            response.body[0].should.have.property('ldmk_num');
            response.body[0].ldmk_num.should.equal(93);
            response.body[0].should.have.property('ldmk_name');
            response.body[0].ldmk_name.should.equal('1437 High Street');
            response.body[0].should.have.property('aka_name');
            response.body[0].aka_name.should.equal('Watson House');
            response.body[0].should.have.property('ord_num');
            response.body[0].ord_num.should.equal(293);
            response.body[0].should.have.property('ord_year');
            response.body[0].ord_year.should.equal(1976);
            response.body[0].should.have.property('address_line1');
            response.body[0].address_line1.should.equal('1437 High Street');
            response.body[0].should.have.property('address_line2');
            // response.body[0].address_line2.should.equal(null);
            response.body[0].should.have.property('situs_num');
            response.body[0].situs_num.should.equal(1437);
            response.body[0].should.have.property('situs_dir');
            // response.body[0].situs_dir.should.equal(null);
            response.body[0].should.have.property('situs_st');
            response.body[0].situs_st.should.equal('High');
            response.body[0].should.have.property('situs_type');
            response.body[0].situs_type.should.equal('ST');
            response.body[0].should.have.property('historic_dist');
            response.body[0].historic_dist.should.equal(1);
            response.body[0].should.have.property('state_hist_num');
            response.body[0].state_hist_num.should.equal('5DV.5811');
            response.body[0].should.have.property('year_built');
            response.body[0].year_built.should.equal('1894');
            response.body[0].should.have.property('arch_bldr');
            // response.body[0].arch_bldr.should.equal(null);
            response.body[0].should.have.property('document');
            // response.body[0].document.should.equal(null);
            response.body[0].should.have.property('photo_link');
            response.body[0].photo_link.should.equal('yes');
            response.body[0].should.have.property('notes');
            // response.body[0].notes.should.equal(null);
            response.body[0].should.have.property('gis_notes');
            // response.body[0].gis_notes.should.equal(null);
            response.body[0].should.have.property('description');
            // response.body[0].description.should.equal(null);
            response.body[0].should.have.property('address_id');
            // response.body[0].address_id.should.equal(null);
          })
          .catch( error => {
            throw error;
          });

      });
    });

    describe('GET /api/v1/buildings/:id', () => {
      it('should return a specific building', () => {
        return chai.request(server)
          .get('/api/v1/buildings/1')
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.an('array');
            response.body.length.should.equal(1);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);
            response.body[0].should.have.property('ldmk_num');
            response.body[0].ldmk_num.should.equal(93);
            response.body[0].should.have.property('ldmk_name');
            response.body[0].ldmk_name.should.equal('1437 High Street');
            response.body[0].should.have.property('aka_name');
            response.body[0].aka_name.should.equal('Watson House');
            response.body[0].should.have.property('ord_num');
            response.body[0].ord_num.should.equal(293);
            response.body[0].should.have.property('ord_year');
            response.body[0].ord_year.should.equal(1976);
            response.body[0].should.have.property('address_line1');
            response.body[0].address_line1.should.equal('1437 High Street');
            response.body[0].should.have.property('address_line2');
            // response.body[0].address_line2.should.equal(null);
            response.body[0].should.have.property('situs_num');
            response.body[0].situs_num.should.equal(1437);
            response.body[0].should.have.property('situs_dir');
            // response.body[0].situs_dir.should.equal(null);
            response.body[0].should.have.property('situs_st');
            response.body[0].situs_st.should.equal('High');
            response.body[0].should.have.property('situs_type');
            response.body[0].situs_type.should.equal('ST');
            response.body[0].should.have.property('historic_dist');
            response.body[0].historic_dist.should.equal(1);
            response.body[0].should.have.property('state_hist_num');
            response.body[0].state_hist_num.should.equal('5DV.5811');
            response.body[0].should.have.property('year_built');
            response.body[0].year_built.should.equal('1894');
            response.body[0].should.have.property('arch_bldr');
            // response.body[0].arch_bldr.should.equal(null);
            response.body[0].should.have.property('document');
            // response.body[0].document.should.equal(null);
            response.body[0].should.have.property('photo_link');
            response.body[0].photo_link.should.equal('yes');
            response.body[0].should.have.property('notes');
            // response.body[0].notes.should.equal(null);
            response.body[0].should.have.property('gis_notes');
            // response.body[0].gis_notes.should.equal(null);
            response.body[0].should.have.property('description');
            // response.body[0].description.should.equal(null);
            response.body[0].should.have.property('address_id');
            // response.body[0].address_id.should.equal(null);
          })
          .catch( error => {
            throw error;
          })
      })
      it('should return a 404 error if the building does not exist', () => {
        return chai.request(server)
          .get('/api/v1/buildings/999')
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal('That building does not exist')
          })
          .catch( error => {
            throw error;
          })
      })
    })

    describe('PATCH /api/v1/buildings/:id/description', () => {
      it('should return a success message when the description is changed', () => {
        return chai.request(server)
          .patch('/api/v1/buildings/1/description')
          .send({
            token: goodToken,
            description: 'asdf'
          })
          .then( response => {
            response.should.have.status(200);
            response.body.should.equal('description changed successfully')
          })
          .catch( error => {
            throw error;
          })
      })
      it('should return a 422 error if there is no description in the body', () => {
        return chai.request(server)
          .patch('/api/v1/buildings/0/description')
          .send({
            token: goodToken
            // description
          })
          .then(response => {
            response.should.have.status(422);
            response.body.error.should.equal('Description is required')
          })
          .catch( error => {
            throw error;
          })
      })
      it('should return a 422 error if the description is empty', () => {
        return chai.request(server)
          .patch('/api/v1/buildings/0/description')
          .send({
            token: goodToken,
            description: ''
          })
          .then(response => {
            response.should.have.status(422);
            response.body.error.should.equal('Description is required')
          })
          .catch( error => {
            throw error;
          })
      })
      it('should return a 404 error if the target building doesnt exist', () => {
        return chai.request(server)
          .patch('/api/v1/buildings/999/description')
          .send({
            token: goodToken,
            description: 'asdf'
          })
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal('That building does not exist')
          })
          .catch( error => {
            throw error;
          })
      })
    })

    describe('PATCH /api/v1/buildings/:id/aka_name', () => {
      it('should change the aka_name of a building', () => {
        return chai.request(server)
          .patch('/api/v1/buildings/1/aka_name')
          .send({
            token: goodToken,
            akaName: 'Trattoria di Nora'
          })
          .then(response => {
            response.should.have.status(200);
            response.body.should.equal('aka_name changed successfully on 1')
          })
          .catch(error => {
            throw error;
          })
      })
      it('should return a 404 if the target building does not exist', () => {
        return chai.request(server)
          .patch('/api/v1/buildings/999/aka_name')
          .send({
            token: goodToken,
            akaName: 'Casa de Nora'
          })
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal('That building does not exist')
          })
          .catch(error => {
            throw error;
          })
      })
      it('should return a 422 if there is no aka_name provided', () => {
        return chai.request(server)
          .patch('/api/v1/buildings/1/aka_name')
          .send({
            token: goodToken,
            // akaName
          })
          .then(response => {
            response.should.have.status(422);
            response.body.error.should.equal('aka_name is required')
          })
          .catch(error => {
            throw error;
          })
      })
      it('should return a 422 if the aka_name provided is empty', () => {
        return chai.request(server)
          .patch('/api/v1/buildings/1/aka_name')
          .send({
            token: goodToken,
            akaName: ''
          })
          .then(response => {
            response.should.have.status(422);
            response.body.error.should.equal('aka_name is required')
          })
          .catch(error => {
            throw error;
          })
      })
    })

    describe('POST /api/v1/buildings', () => {
      it('should create a new building', () => {
        return chai.request(server)
          .post('/api/v1/buildings')
          .send({
            token: goodToken,
            aka_name: 'Nora\'s Castle'
          })
          .then( response => {
            response.should.have.status(201);
          })
          .catch( error => {
            throw error;
          })
      })
      it.skip('should return a 422 error if the user tries to add a key that is not approved', () => {
        return chai.request(server)
          .post('/api/v1/buildings')
          .send({
            token: goodToken,
            asdf: 'Phil'
          })
          .then(response => {
            response.should.have.status(422);
            response.body.error.should.equal(`Expected keys are: 'ldmk_num', 'ldmk_name', 'aka_name', 'ord_num', 'ord_year', 'address_line1', 'address_line2', 'situs_num', 'situs_dir', 'situs_st', 'situs_type', 'state_hist_num', 'year_built', 'arch_bldr', 'document', 'photo_link', 'notes', 'gis_notes', 'description', 'address_id', 'historic_dist'. You entered a groundhog property.`);
          })
          .catch( error => {
            throw error;
          })
      })
    })

    describe('DELETE /api/v1/buildings/', () => {
      it('should delete a building', () => {
        return chai.request(server)
          .delete('/api/v1/buildings')
          .send({ 
            token: goodToken,
            id: 1
          })
          .then(response => {
            response.should.have.status(202);
            response.body.should.equal('You deleted building 1')
          })
          .catch(error => {
            throw error;
          })
      })
      it('should return a 404 if the building doesnt exist', () => {
        return chai.request(server)
          .delete('/api/v1/buildings')
          .send({
            token: goodToken,
            id: 999
          })
          .then(response => {
            response.should.have.status(404);
            response.body.error.should.equal('Could not find building with id 999')
          })
          .catch(error => {
            throw error;
          })
      })
      it('should return a 422 if there is no id included', () => {
        return chai.request(server)
          .delete('/api/v1/buildings')
          .send({
            token: goodToken
            // id:
          })
          .then(response => {
            response.should.have.status(422);
            response.body.error.should.equal('Please include the id of the building to delete')
          })
          .catch(error => {
            throw error;
          })
      })
    })
  })
})
