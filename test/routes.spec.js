const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
// const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp);

before(() => {
  return database.migrate.latest()
})

beforeEach(() => {
  return database.seed.run();
})

describe('Client Routes', () => {
  
});

describe('API Routes', () => {
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
            response.body[0].id.should.equal(0);
            response.body[0].should.have.property('name');
            response.body[0].name.should.equal('Wyman');
          })
          .catch(error => {
            throw error;
          })
      })
    })

    describe('GET /api/v1/buildings/:id', () => {
      it('should return a specific district', () => {
        return chai.request(server)
          .get('/api/v1/districts/0')
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.an('array');
            response.body.length.should.equal(1);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(0);
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
          .get('/api/v1/districts/0/buildings')
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.an('array');
            response.body.length.should.equal(1);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(0);
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
            response.body[0].historic_dist.should.equal(0);
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
            response.body[0].id.should.equal(0);
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
            response.body[0].historic_dist.should.equal(0);
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
          .get('/api/v1/buildings/0')
          .then(response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.an('array');
            response.body.length.should.equal(1);
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(0);
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
            response.body[0].historic_dist.should.equal(0);
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
          .patch('/api/v1/buildings/0/description')
          .send({description: 'asdf'})
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
  })
})