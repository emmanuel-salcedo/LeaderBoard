const sequelize = require('../database');

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const leagueRoutes = require('./routes/league');
const churchRoutes = require('./routes/church');
const pointRoutes = require('./routes/point');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/leagues', leagueRoutes);
app.use('/churches', churchRoutes);
app.use('/points', pointRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
