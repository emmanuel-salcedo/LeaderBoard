const express = require('express');
const app = express();
const { sequelize } = require('./models');
const leagueRoutes = require('./routes/leagues');
const churchRoutes = require('./routes/churches');
const pointRoutes = require('./routes/points');

app.use(express.json());

app.use('/leagues', leagueRoutes);
app.use('/churches', churchRoutes);
app.use('/points', pointRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});
