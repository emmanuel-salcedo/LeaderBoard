# Leaderboard App Backend

This is the backend for the Leaderboard App, a system for managing leagues, churches, and their points.

## Table of Contents

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Database Initialization](#database-initialization)
- [Endpoints](#endpoints)
  - [Leagues](#leagues)
  - [Churches](#churches)
  - [Points](#points)

## Project Description

The Leaderboard App allows users to manage leagues, churches, and points. It includes functionality for creating, reading, updating, and deleting these entities while keeping track of the total points for each church.

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL

## Setup and Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/leaderboard-app.git
cd leaderboard-app
```

2. Install dependencies:

```sh
npm install
```

3. Set up the environment variables as described in the [Environment Variables](#environment-variables) section.

4. Initialize the database:

```sh
node config/init.js
```

5. Start the server:

```sh
npm start
```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=your_database_url
```

## Database Initialization

To initialize the database with example data, run:

```sh
node config/init.js
```

## Endpoints

### Leagues

#### Create a League

- **URL:** `/leagues`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "Premier League"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Premier League",
    "createdAt": "2024-06-30T00:00:00.000Z",
    "updatedAt": "2024-06-30T00:00:00.000Z"
  }
  ```

#### Get All Leagues

- **URL:** `/leagues`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Premier League",
      "createdAt": "2024-06-30T00:00:00.000Z",
      "updatedAt": "2024-06-30T00:00:00.000Z"
    }
  ]
  ```

#### Get a League by ID

- **URL:** `/leagues/:id`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Premier League",
    "createdAt": "2024-06-30T00:00:00.000Z",
    "updatedAt": "2024-06-30T00:00:00.000Z",
    "Churches": [
      {
        "id": 1,
        "name": "Church 1",
        "totalPoints": 100,
        "LeagueId": 1,
        "createdAt": "2024-06-30T00:00:00.000Z",
        "updatedAt": "2024-06-30T00:00:00.000Z"
      }
    ]
  }
  ```

#### Update a League

- **URL:** `/leagues/:id`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "name": "Updated League Name"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Updated League Name",
    "createdAt": "2024-06-30T00:00:00.000Z",
    "updatedAt": "2024-06-30T00:00:00.000Z"
  }
  ```

#### Delete a League

- **URL:** `/leagues/:id`
- **Method:** `DELETE`
- **Response:**
  ```json
  {
    "message": "League deleted successfully"
  }
  ```

### Churches

#### Create a Church

- **URL:** `/churches`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "Church Alpha",
    "LeagueId": 1
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Church Alpha",
    "totalPoints": 0,
    "LeagueId": 1,
    "createdAt": "2024-06-30T00:00:00.000Z",
    "updatedAt": "2024-06-30T00:00:00.000Z"
  }
  ```

#### Get All Churches

- **URL:** `/churches`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Church Alpha",
      "totalPoints": 0,
      "LeagueId": 1,
      "createdAt": "2024-06-30T00:00:00.000Z",
      "updatedAt": "2024-06-30T00:00:00.000Z",
      "Points": [
        {
          "id": 1,
          "description": "Initial Point",
          "date": "2024-06-30T00:00:00.000Z",
          "points": 0,
          "ChurchId": 1,
          "createdAt": "2024-06-30T00:00:00.000Z",
          "updatedAt": "2024-06-30T00:00:00.000Z"
        }
      ],
      "League": {
        "id": 1,
        "name": "Premier League",
        "createdAt": "2024-06-30T00:00:00.000Z",
        "updatedAt": "2024-06-30T00:00:00.000Z"
      }
    }
  ]
  ```

#### Get a Church by ID

- **URL:** `/churches/:id`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Church Alpha",
    "totalPoints": 0,
    "LeagueId": 1,
    "createdAt": "2024-06-30T00:00:00.000Z",
    "updatedAt": "2024-06-30T00:00:00.000Z",
    "Points": [
      {
        "id": 1,
        "description": "Initial Point",
        "date": "2024-06-30T00:00:00.000Z",
        "points": 0,
        "ChurchId": 1,
        "createdAt": "2024-06-30T00:00:00.000Z",
        "updatedAt": "2024-06-30T00:00:00.000Z"
      }
    ],
    "League": {
      "id": 1,
      "name": "Premier League",
      "createdAt": "2024-06-30T00:00:00.000Z",
      "updatedAt": "2024-06-30T00:00:00.000Z"
    }
  }
  ```

#### Update a Church

- **URL:** `/churches/:id`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "name": "Updated Church Name"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Updated Church Name",
    "totalPoints": 0,
    "LeagueId": 1,
    "createdAt": "2024-06-30T00:00:00.000Z",
    "updatedAt": "2024-06-30T00:00:00.000Z"
  }
  ```

#### Delete a Church

- **URL:** `/churches/:id`
- **Method:** `DELETE`
- **Response:**
  ```json
  {
    "message": "Church deleted successfully"
  }
  ```

### Points

#### Create a Point

- **URL:** `/points`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "description": "New Point",
    "date": "2024-06-30",
    "points": 50,
    "ChurchId": 1
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "description": "New Point",
    "date": "2024-06-30",
    "points": 50,
    "ChurchId": 1,
    "createdAt": "2024-06-30T00:00:00.000Z",
    "updatedAt": "2024-06-30T00:00:00.000Z"
  }
  ```

#### Get a Point by ID

- **URL

:** `/points/:id`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "id": 1,
    "description": "New Point",
    "date": "2024-06-30",
    "points": 50,
    "ChurchId": 1,
    "createdAt": "2024-06-30T00:00:00.000Z",
    "updatedAt": "2024-06-30T00:00:00.000Z"
  }
  ```

#### Update a Point

- **URL:** `/points/:id`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "description": "Updated Point",
    "date": "2024-06-30",
    "points": 75
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "description": "Updated Point",
    "date": "2024-06-30",
    "points": 75,
    "ChurchId": 1,
    "createdAt": "2024-06-30T00:00:00.000Z",
    "updatedAt": "2024-06-30T00:00:00.000Z"
  }
  ```

#### Delete a Point

- **URL:** `/points/:id`
- **Method:** `DELETE`
- **Response:**
  ```json
  {
    "message": "Point deleted successfully"
  }
  ```

## License

This project is licensed under the MIT License.
