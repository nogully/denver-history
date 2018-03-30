[![Build Status](https://travis-ci.org/nogully/denver-history.svg?branch=master)](https://travis-ci.org/nogully/denver-history)

## Denver Historical Buildings 

A RESTful API to host a database of historic buildings in Denver, CO.

## Endpoints and HTTP Requests

Endpoints available (e.g. GET /api/v1/students, POST api/v1/students)

What parameters can be used in certain requests (e.g. For a POST request, what should be put in the request body?)

Sample responses from endpoints (What does the response object look like for a request?)

### Authentication

`POST /authenticate`

### Districts

`GET /api/v1/districts`

`GET /api/v1/districts/:id`
(id: integer)

`GET /api/v1/districts/:id/buildings`
(id: integer)

`POST /api/v1/districts`
(name: string) - token

`DELETE /api/v1/districts`
(id: integer) - token

### Buildings

`GET /api/v1/buildings`
Response
```

`GET /api/v1/buildings/:id`
(id: integer)

`POST /api/v1/buildings`
table.float('ldmk_num');
table.string('ldmk_name');
table.string('aka_name');
table.integer('ord_num');
table.integer('ord_year');
table.string('address_line1');
table.string('address_line2');
table.integer('situs_num');
table.string('situs_st');
table.string('situs_type');
table.integer('historic_dist');
table.foreign('historic_dist')
  .references('districts.id');
table.string('state_hist_num');
table.string('year_built');
table.string('arch_bldr');
table.string('document');
table.string('photo_link');
table.string('notes');
table.string('gis_notes');
table.string('description');
table.integer('address_id');
-token

`PATCH /api/v1/buildings/:id/description`
(id: integer, description: string) -token

`PATCH /api/v1/buildings/:id/aka_name`
(id: integer, akaName: string) -token

`DELETE /api/v1/buildings`
(id: integer) - token

### Search

`GET /api/v1/search`
(query parameters: key, value)
