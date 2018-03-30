[![Build Status](https://travis-ci.org/nogully/denver-history.svg?branch=master)](https://travis-ci.org/nogully/denver-history)

## Denver Historical Buildings 

A RESTful API to host a database of historic buildings in Denver, CO.

## Endpoints and HTTP Requests

Endpoints available (e.g. GET /api/v1/students, POST api/v1/students)

What parameters can be used in certain requests (e.g. For a POST request, what should be put in the request body?)

Sample responses from endpoints (What does the response object look like for a request?)

### Authentication 

`POST /authenticate`
  - Sample request: 
  ```{ "email": "louisa.robbie@aol.com", 
       "appName": "Reption" }```

  - Sample response: 
  ```{ "token": "824kgalkd.o3ofalfa.2oodfkdflfl1292349" }```

### Historic Districts

`GET /api/v1/districts`
  - This will return an array of all the districts

`GET /api/v1/districts/:id`
  - `id` is an integer
  - Sample request: `/api/v1/districts/3`
  - Sample response yields the district with that `id`: 
  ```[{"id":3,
      "name":"Downtown Denver",
      "created_at":"2018-03-30T02:50:42.663Z",
      "updated_at":"2018-03-30T02:50:42.663Z"}]```


`GET /api/v1/districts/:id/buildings`
  - `id` is an integer
  - Sample request: `/api/v1/districts/5/buildings`
  - Sample response yields all the buildings in the district with that `id`: 
  ```[{ "id":8,
        "ldmk_num":280,
        "ldmk_name":"Kinneavy Terrace",
        "aka_name":null,
        "ord_num":430,
        "ord_year":1997,
        "address_line1":"2700-2714 Stout Street, 721-727 27th Street",
        "address_line2":null,
        "situs_num":2700,
        "situs_st":"Stout",
        "situs_type":"ST",
        "historic_dist":5,
        "state_hist_num":null,
        "year_built":"c. 1888",
        "arch_bldr":null,
        "document":null,
        "photo_link":"yes",
        "notes":null,
        "gis_notes":null,
        "description":null,
        "address_id":null,
        "created_at":"2018-03-27T22:03:56.670Z",
        "updated_at":"2018-03-27T22:03:56.670Z",
        "situs_dir":null }]```

#### District Admin-Only Endpoints 

The following district endpoints require token authentication:

`POST /api/v1/districts`
(name: string) - token

`DELETE /api/v1/districts`
(id: integer) - token

### Historic Buildings

`GET /api/v1/buildings`
  - Response is an array of all the building objects (below).

`GET /api/v1/buildings/:id`
  - `:id` param is an integer
  - Sample request: `/api/v1/buildings/188`
  - Sample response: 
  ```[{"id":188,
      "ldmk_num":311,
      "ldmk_name":"Denver Union Station",
      "aka_name":null,
      "ord_num":705,
      "ord_year":2004,
      "address_line1":"1701-1777 Wynkoop Street",
      "address_line2":null,
      "situs_num":1701,
      "situs_st":"Wynkoop",
      "situs_type":"ST",
      "historic_dist":9,
      "state_hist_num":"5DV.114",
      "year_built":"1881, 1894 and 1914",
      "arch_bldr":null,
      "document":null,
      "photo_link":"yes",
      "notes":null,
      "gis_notes":null,
      "description":null,
      "address_id":null,
      "created_at":"2018-03-30T02:50:42.750Z",
      "updated_at":"2018-03-30T02:50:42.750Z",
      "situs_dir":null}]```


#### Building Admin-Only Endpoints 

The following building endpoints require token authentication:

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

### Custom Search

`GET /api/v1/search?key=value`
  - `key` parameter is a string representing a key from the above building objects
  - `value` parameter represents the value you are searching for
  - Sample request: `/api/v1/search?ldmk_name=Denver+Union+Station`
  - Sample response: 
    ```[{"id":188,
        "ldmk_num":311,
        "ldmk_name":"Denver Union Station",
        "aka_name":null,
        "ord_num":705,
        "ord_year":2004,
        "address_line1":"1701-1777 Wynkoop Street",
        "address_line2":null,
        "situs_num":1701,
        "situs_st":"Wynkoop",
        "situs_type":"ST",
        "historic_dist":9,
        "state_hist_num":"5DV.114",
        "year_built":"1881, 1894 and 1914",
        "arch_bldr":null,
        "document":null,
        "photo_link":"yes",
        "notes":null,
        "gis_notes":null,
        "description":null,
        "address_id":null,
        "created_at":"2018-03-30T02:50:42.750Z",
        "updated_at":"2018-03-30T02:50:42.750Z",
        "situs_dir":null}]```
        
