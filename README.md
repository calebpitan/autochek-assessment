# Autochek-Assessment

A simple RESTful API designed to collect and store location information using PostgreSQL

See the [getting started](#getting-started)

## Problem Definition

We want to design a system that can tell us the distance between our location and some other locations which we expect to be supplied to us.

### Task

Design a RESTful API which can collect the information on the different locations for us and also determine the distance between the locations and a configurable location which can be changed or supplied. The formula for calculating distance between two points can be gotten here https://en.wikipedia.org/wiki/Great-circle_distance.

### Data Model

Define a set of data models that include:

A location entity with at least the following structure, you can add more to it at your discretion

- Id
- Location name
- Description
- Website (Optional)
- Phone
- Contact Person
- Coordinates

You can make use of any database but we recommend PostgreSQL.

### Rest API

The following RESTful API must be implemented

- Create new location
- Edit Location
- Delete Location
- Fetch All Locations
- Fetch Specific Location
- Calculate distance

### Languages and Frameworks

This task should be completed using

- NestJs Framework
- The data model should also be defined using Grpc (This is optional but using it will earn you extra points)
- An ORM like Type ORM can also be used

## Getting Started

Clone this repo from git bash or GitHub desktop or you can just fork it and clone your forked copy to your development machine.

```bash
git clone git@github.com:calebpitan/autochek-assessment.git

# or fork it to have a copy and clone

git clone git@github.com:<username>/autochek-assessment.git
```

When done with cloning switch to the new `autochek-assessment` folder in the directory you cloned into

```bash
cd autochek-assessment
```

Install dependencies using Yarn

```bash
yarn install
```

## Before starting the server

Before starting the server make sure you have PostgreSQL installed and also PostGIS. You can install PostGIS using the `stackbulilder` application that comes with the PostgreSQL server you just installed (check your installation directory). You can checkout this tutorial that shows [how to install PostGIS using stackbuilder](https://www.bostongis.com/PrinterFriendly.aspx?content_name=PostGIS_tut01).

### What is PostGIS used for?

I used PostGIS to store location coordinates (latitude and longitude), which stores it in a very efficient data format that doesn't come out of the box with the PostgreSQL application.

You can learn more about [PostGIS](https://postgis.net/).

When all this necessary installations are complete, make sure your PostgreSQL server is running as a background service (or at least running).

## Setting up environment variables

There's an `.env.example` file in this repo that exposes the ENV_VARS required to run this application. They are to be created into an `.env` file in the same directory as the `.env.example` with actual values.

- `PORT`: the application port (e.g, 5000)
- `PG_HOST`: the host on which the database is running (e.g, localhost)
- `PG_PORT`: the port on which the databse is listening (e.g, 5432)
- `PG_USER`: the database user (e.g, 'postgres')
- `PG_PASSWORD`: the database user's password (e.g, 'root')
- `PG_DATABASE`: the name of the database to use (e.g, autochek_assessment). If this database doesn't exit, you should create it first.

## Example Requests

### /GET location

Returns a list of all found location

- query
  - limit (`number`) - the amount of results to be returned
  - offset (`number`) - the amount records to skip before starting to select records

```bash
curl http://localhost:5000/location
```

- response

  ```json
  {
    "data": {
      "location": [
        {
          "id": 1,
          "location_name": "Lagos",
          "description": "Lagos in Nigeria",
          "website": "https://www.lagos.ng",
          "phone": "07066001122",
          "contact_person": "Jide Sanwolu",
          "coordinates": {
            "type": "Point",
            "coordinates": [6.4550575, 3.3941795]
          }
        },
        {
          "id": 2,
          "location_name": "Abuja",
          "description": "Abuja in Nigeria",
          "website": "https://www.abuja.ng",
          "phone": "07088001122",
          "contact_person": "Office of the President",
          "coordinates": {
            "type": "Point",
            "coordinates": [9.4550575, 4.3941795]
          }
        }
      ]
    }
  }
  ```

### /GET location/:id

Returns a list of all found location

```bash
curl http://localhost:5000/location/1
```

- response

  ```json
  {
    "data": {
      "location": {
        "id": 1,
        "location_name": "Lagos",
        "description": "Lagos in Nigeria",
        "website": "https://www.lagos.ng",
        "phone": "07066001122",
        "contact_person": "Jide Sanwolu",
        "coordinates": {
          "type": "Point",
          "coordinates": [6.4550575, 3.3941795]
        }
      }
    }
  }
  ```

### /POST location

Creates a new location

```bash
curl -d '{ "location_name": "Lagos", "description": "Lagos in Nigeria", "website": "https://www.lagos.ng", "phone": "07066001122", "contact_person": "Jide Sanwolu", "coordinates": [ 6.4550575, 3.3941795 ] }' -X POST http://localhost:5000/location
```

- response

  ```json
  {
    "data": {
      "location": {
        "id": 1,
        "location_name": "Lagos",
        "description": "Lagos in Nigeria",
        "website": "https://www.lagos.ng",
        "phone": "07066001122",
        "contact_person": "Jide Sanwolu",
        "coordinates": {
          "type": "Point",
          "coordinates": [6.4550575, 3.3941795]
        }
      },
      "message": "...",
      "success": true
    }
  }
  ```

### /PUT location/:id

Updates a location found by its `id`

```bash
curl -d '{ "contact_person": "Raji Fashola" }' -X PUT http://localhost:5000/location/1
```

- response

  ```json
  {
    "data": {
      "location": {
        "id": 1,
        "location_name": "Lagos",
        "description": "Lagos in Nigeria",
        "website": "https://www.lagos.ng",
        "phone": "07066001122",
        "contact_person": "Raji Fashola",
        "coordinates": {
          "type": "Point",
          "coordinates": [6.4550575, 3.3941795]
        }
      },
      "message": "...",
      "success": true
    }
  }
  ```

### /DELETE location/:id

Deletes a location found by its `id`

```bash
curl -X DELETE http://localhost:5000/location/1
```

- response

  ```json
  {
    "data": {
      "id": 1,
    },
    "message": "...",
    "success": true
  }
  ```
