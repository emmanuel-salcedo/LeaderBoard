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

#### Get Church Total Points
- **URL**: `/churches/:id/points`
- **Method**: `GET`
- **Response**: `200 OK`, `{ "id": 1, "name": "Church Name", "totalPoints": 100, "LeagueId": 1, "Points": [ ... ] }`

#### Get Church League
- **URL**: `/churches/:id/league`
- **Method**: `GET`
- **Response**: `200 OK`, `{ "id": 1, "name": "Church Name", "League": { "id": 1,Here is the revised code to include endpoints for handling the CRUD operations for leagues, churches, and points while ensuring there are no redundancies. This includes the functionality to update the total points for churches when points are created, updated, or deleted.

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
