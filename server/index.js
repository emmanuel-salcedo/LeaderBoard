const express = require('express');
const path = require('path');
const cors = require('cors');
const { sequelize } = require('./models');
const leagueRoutes = require('./routes/leagues');
const churchRoutes = require('./routes/churches');
const pointRoutes = require('./routes/points');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/leagues', leagueRoutes);
app.use('/churches', churchRoutes);
app.use('/points', pointRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
