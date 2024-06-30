# LigaEVG API Documentation

## Base URL
`https://ligaevg-6917d6adeeb9.herokuapp.com`

## Endpoints

### Leagues

#### Create a League
- **URL**: `/leagues`
- **Method**: `POST`
- **Body**: `{ "name": "League Name" }`
- **Response**: `201 Created`, `{ "id": 1, "name": "League Name" }`

#### Edit a League
- **URL**: `/leagues/:id`
- **Method**: `PUT`
- **Body**: `{ "name": "New League Name" }`
- **Response**: `200 OK`, `{ "id": 1, "name": "New League Name" }`

#### Get All Leagues
- **URL**: `/leagues`
- **Method**: `GET`
- **Response**: `200 OK`, `[ { "id": 1, "name": "League Name" }, ... ]`

#### Get a League by ID
- **URL**: `/leagues/:id`
- **Method**: `GET`
- **Response**: `200 OK`, `{ "id": 1, "name": "League Name" }`

#### Delete a League
- **URL**: `/leagues/:id`
- **Method**: `DELETE`
- **Response**: `204 No Content`

#### Get All Churches in a League
- **URL**: `/leagues/:id/churches`
- **Method**: `GET`
- **Response**: `200 OK`, `[ { "id": 1, "name": "Church Name", "totalPoints": 0, "LeagueId": 1 }, ... ]`

### Churches

#### Create a Church
- **URL**: `/churches`
- **Method**: `POST`
- **Body**: `{ "name": "Church Name", "LeagueId": 1, "totalPoints": 0 }`
- **Response**: `201 Created`, `{ "id": 1, "name": "Church Name", "totalPoints": 0, "LeagueId": 1 }`

#### Edit a Church
- **URL**: `/churches/:id`
- **Method**: `PUT`
- **Body**: `{ "name": "New Church Name", "LeagueId": 2 }`
- **Response**: `200 OK`, `{ "id": 1, "name": "New Church Name", "totalPoints": 0, "LeagueId": 2 }`

#### Delete a Church
- **URL**: `/churches/:id`
- **Method**: `DELETE`
- **Response**: `204 No Content`

#### Get Church by ID
- **URL**: `/churches/:id`
- **Method**: `GET`
- **Response**: `200 OK`, `{ "id": 1, "name": "Church Name", "totalPoints": 100, "LeagueId": 1, "Points": [ ... ], "League": { "id": 1, "name": "League Name" } }`

#### Get Church Total Points
- **URL**: `/churches/:id/points`
- **Method**: `GET`
- **Response**: `200 OK`, `{ "id": 1, "name": "Church Name", "totalPoints": 100, "LeagueId": 1, "Points": [ ... ] }`

#### Get Church League
- **URL**: `/churches/:id/league`
- **Method**: `GET`
- **Response**: `200 OK`, `{ "id": 1, "name": "Church Name", "League": { "id": 1, "name": "League Name" } }`

### Points

#### Create a Point
- **URL**: `/points`
- **Method**: `POST`
- **Body**: `{ "description": "Good Deed", "date": "2024-06-30T00:00:00.000Z", "points": 10, "ChurchId": 1 }`
- **Response**: `201 Created`, `{ "id": 1, "description": "Good Deed", "date": "2024-06-30T00:00:00.000Z", "points": 10, "ChurchId": 1 }`

#### Delete a Point
- **URL**: `/points/:id`
- **Method**: `DELETE`
- **Response**: `204 No Content`

#### Update a Point
- **URL**: `/points/:id`
- **Method**: `PUT`
- **Body**: `{ "description": "New Description", "date": "2024-06-30T00:00:00.000Z", "points": 20 }`
- **Response**: `200 OK`, `{ "id": 1, "description": "New Description", "date": "2024-06-30T00:00:00.000Z", "points": 20, "ChurchId": 1 }`

### Server Setup

#### `models/league.js`
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const League = sequelize.define('League', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = League;
