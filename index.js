const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Database setup with SSL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // You might want to handle this more securely in production
    }
  },
});

// Define the Leaderboard model
const Leaderboard = sequelize.define('Leaderboard', {
  church: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the database
sequelize.sync();

// Routes
app.get('/leaderboard', async (req, res) => {
  const leaderboard = await Leaderboard.findAll();
  res.json(leaderboard);
});

app.post('/leaderboard', async (req, res) => {
  const { church, points } = req.body;
  const newEntry = await Leaderboard.create({ church, points });
  res.json(newEntry);
});

app.put('/leaderboard/:id', async (req, res) => {
  const { id } = req.params;
  const { points } = req.body;
  const entry = await Leaderboard.findByPk(id);
  if (entry) {
    entry.points = points;
    await entry.save();
    res.json(entry);
  } else {
    res.status(404).send('Entry not found');
  }
});

app.delete('/leaderboard/:id', async (req, res) => {
  const { id } = req.params;
  const entry = await Leaderboard.findByPk(id);
  if (entry) {
    await entry.destroy();
    res.json({ message: 'Entry deleted' });
  } else {
    res.status(404).send('Entry not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
