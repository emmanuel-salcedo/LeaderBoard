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

app.use('/leagues', leagueRoutes);
app.use('/churches', churchRoutes);
app.use('/points', pointRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));

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
