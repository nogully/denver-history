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
       "appName": "Reption" }
  ```

  - Sample response: 
  `{ "token": "824kgalkd.o3ofalfa.2oodfkdflfl1292349" }`

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
      "updated_at":"2018-03-30T02:50:42.663Z"}]
  ```


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
        "situs_dir":null }]
   ```

#### District Admin-Only Endpoints 

The following district endpoints require token authentication:

`POST /api/v1/districts`
  - Sample request: 
  ```[{ "token": "343olkdal.9jglada.2oagl2k4tkla",
        "name":"Downtown Denver" }]
  ```
  - Sample response yields the new `id`
  

`DELETE /api/v1/districts`
  - Sample request: 
  ```[{ "token": "343olkdal.9jglada.2oagl2k4tkl",
        "id":"55" }]
  ```
  - Sample response: 
  `You deleted district 55`

### Historic Buildings

`GET /api/v1/buildings`

Response
```
[
  {
    "id": 1,
    "ldmk_num": 93,
    "ldmk_name": "1437 High Street",
    "aka_name": "Watson House",
    "ord_num": 293,
    "ord_year": 1976,
    "address_line1": "1437 High Street",
    "address_line2": null,
    "situs_num": 1437,
    "situs_st": "High",
    "situs_type": "ST",
    "historic_dist": 1,
    "state_hist_num": "5DV.5811",
    "year_built": "1894",
    "arch_bldr": null,
    "document": null,
    "photo_link": "yes",
    "notes": null,
    "gis_notes": null,
    "description": null,
    "address_id": null,
    "created_at": "2018-03-29T17:45:23.959Z",
    "updated_at": "2018-03-29T17:45:23.959Z",
    "situs_dir": null
  },
  {
    "id": 2,
    "ldmk_num": 94,
    "ldmk_name": "Kerr House",
    "aka_name": null,
    "ord_num": 360,
    "ord_year": 1976,
    "address_line1": "1900 E. 7th Avenue Parkway",
    "address_line2": null,
    "situs_num": 1900,
    "situs_st": "7th Avenue",
    "situs_type": "PKY",
    "historic_dist": 2,
    "state_hist_num": "5DV.751",
    "year_built": "1925",
    "arch_bldr": null,
    "document": null,
    "photo_link": "yes",
    "notes": null,
    "gis_notes": null,
    "description": null,
    "address_id": null,
    "created_at": "2018-03-29T17:45:23.959Z",
    "updated_at": "2018-03-29T17:45:23.959Z",
    "situs_dir": "E"
  },
  ...
]
```

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
      "situs_dir":null}]
   ```


#### Building Admin-Only Endpoints 

The following building endpoints require token authentication:

`POST /api/v1/buildings`

Parameters

```
         Name    |   Type
         `token` | <Your JSON Web Token> (Required)
// All of the following parameters are optional
// Any parameters not specified default to `null`
      `ldmk_num` | `float`
     `ldmk_name` | `string`
      `aka_name` | `string`
       `ord_num` | `integer`
      `ord_year` | `integer`
 `address_line1` | `string`
 `address_line2` | `string`
     `situs_num` | `integer`
      `situs_st` | `string`
    `situs_type` | `string`
 `historic_dist` | `integer`
`state_hist_num` | `string`
    `year_built` | `string`
     `arch_bldr` | `string`
      `document` | `string`
    `photo_link` | `string`
         `notes` | `string`
     `gis_notes` | `string`
   `description` | `string`
    `address_id` | `integer`
```

Example

This Post Request

```
fetch('https://denver-history.herokuapp.com/api/v1/buildings', {
  method: POST,
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    token: <Your Access Token>,
    aka_name: 'Chez Nora',
    address_line1: '123 Fake St',
    historic_dist: 3,
    description: 'Simply the best place ever'
  }
})
```

Creates this object

```
[
  {
                "id": 5,
          "ldmk_num": null,
         "ldmk_name": null,
          "aka_name": "Chez Nora",
           "ord_num": null,
          "ord_year": null,
     "address_line1": "123 Fake St",
     "address_line2": null,
         "situs_num": null,
          "situs_st": null,
        "situs_type": null,
     "historic_dist": 3,
    "state_hist_num": null,
        "year_built": null,
         "arch_bldr": null,
          "document": null,
        "photo_link": null,
             "notes": null,
         "gis_notes": null,
       "description": 'Simply the best place ever',
        "address_id": null,
        "created_at": "2018-03-29T17:45:23.959Z",
        "updated_at": "2018-03-29T17:45:23.959Z",
         "situs_dir": null
  }
]
```

Response

`You made a building with an id of 5`

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
        "situs_dir":null}]
    ```
        
