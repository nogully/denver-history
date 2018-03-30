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

`GET /api/v1/buildings/:id`

Parameters

```
Name |   Type    | Required?
`id` | `integer` |  `yes`
```

Example

```
fetch('https://denver-history.herokuapp.com/api/v1/buildings/1')
```

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
  }
]
```

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

### Search

`GET /api/v1/search`
(query parameters: key, value)
