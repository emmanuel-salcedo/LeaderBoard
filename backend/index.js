// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize Sequelize
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

// Define models
const League = sequelize.define('League', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Church = sequelize.define('Church', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

const Point = sequelize.define('Point', {
  value: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define relationships
League.hasMany(Church, { onDelete: 'CASCADE' });
Church.belongsTo(League);
Church.hasMany(Point, { onDelete: 'CASCADE' });
Point.belongsTo(Church);

// Sync database
sequelize.sync();

// Routes
app.get('/', (req, res) => {
  res.send('Hello, this is the leaderboard app backend!');
});

// League CRUD
app.post('/leagues', async (req, res) => {
  try {
    const league = await League.create(req.body);
    res.status(201).json(league);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/leagues', async (req, res) => {
  try {
    const leagues = await League.findAll();
    res.status(200).json(leagues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/leagues/:id', async (req, res) => {
  try {
    const league = await League.findByPk(req.params.id);
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/leagues/:id', async (req, res) => {
  try {
    const league = await League.findByPk(req.params.id);
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    await league.update(req.body);
    res.status(200).json(league);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/leagues/:id', async (req, res) => {
  try {
    const league = await League.findByPk(req.params.id);
    if (!league) {
      return res.status(404).json({ error: 'League not found' });
    }
    await league.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Church CRUD
app.post('/churches', async (req, res) => {
  try {
    const church = await Church.create(req.body);
    res.status(201).json(church);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/churches', async (req, res) => {
  try {
    const churches = await Church.findAll();
    res.status(200).json(churches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/churches/:id', async (req, res) => {
  try {
    const church = await Church.findByPk(req.params.id);
    if (!church) {
      return res.status(404).json({ error: 'Church not found' });
    }
    res.status(200).json(church);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/churches/:id', async (req, res) => {
  try {
    const church = await Church.findByPk(req.params.id);
    if (!church) {
      return res.status(404).json({ error: 'Church not found' });
    }
    await church.update(req.body);
    res.status(200).json(church);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/churches/:id', async (req, res) => {
  try {
    const church = await Church.findByPk(req.params.id);
    if (!church) {
      return res.status(404).json({ error: 'Church not found' });
    }
    await church.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Point CRUD
app.post('/points', async (req, res) => {
  try {
    const point = await Point.create(req.body);
    const church = await Church.findByPk(req.body.ChurchId);
    if (church) {
      church.totalPoints += point.value;
      await church.save();
    }
    res.status(201).json(point);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/points', async (req, res) => {
  try {
    const points = await Point.findAll();
    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/points/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    res.status(200).json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/points/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    const church = await Church.findByPk(point.ChurchId);
    if (church) {
      church.totalPoints -= point.value;
    }
    await point.update(req.body);
    if (church) {
      church.totalPoints += point.value;
      await church.save();
    }
    res.status(200).json(point);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/points/:id', async (req, res) => {
  try {
    const point = await Point.findByPk(req.params.id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    const church = await Church.findByPk(point.ChurchId);
    if (church) {
      church.totalPoints -= point.value;
      await church.save();
    }
    await point.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all churches for a league
app.get('/leagues/:leagueId/churches', async (req, res) => {
  try {
    const churches = await Church.findAll({ where: { LeagueId: req.params.leagueId } });
    res.status(200).json(churches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all points for a church
app.get('/churches/:churchId/points', async (req, res) => {
  try {
    const points = await Point.findAll({ where: { ChurchId: req.params.churchId } });
    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
