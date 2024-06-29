const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const leagueRoutes = require('./routes/league');
const churchRoutes = require('./routes/church');
const pointRoutes = require('./routes/point');

// Use routes
app.use('/leagues', leagueRoutes);
app.use('/churches', churchRoutes);
app.use('/points', pointRoutes);

app.get('/', (req, res) => {
  res.send('Hello, this is the leaderboard app API.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  sequelize.sync().then(() => {
    console.log('Database synced');
  });
});
