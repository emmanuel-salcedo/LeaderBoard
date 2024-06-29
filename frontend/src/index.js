const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = process.env.PORT || 3000;

// Use the CORS middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { Sequelize, DataTypes } = require('sequelize');

// Database setup (Postgres in this example)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Define the models
const Church = sequelize.define('Church', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  league: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// API endpoints
app.get('/leaderboard', async (req, res) => {
  try {
    const churches = await Church.findAll({
      order: [['points', 'DESC']]
    });
    res.json(churches);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/add-church', async (req, res) => {
  const { name, league } = req.body;
  try {
    const newChurch = await Church.create({ name, league });
    res.status(201).json(newChurch);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/add-points', async (req, res) => {
  const { churchId, points } = req.body;
  try {
    const church = await Church.findByPk(churchId);
    if (church) {
      church.points += points;
      await church.save();
      res.json(church);
    } else {
      res.status(404).send('Church not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
