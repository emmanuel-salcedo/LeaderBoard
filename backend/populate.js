const { Sequelize, DataTypes } = require('sequelize');

// Database setup
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
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
  league: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sample data
const sampleData = [
  { church: 'Church A', points: 10, league: 'League 1' },
  { church: 'Church B', points: 20, league: 'League 1' },
  { church: 'Church C', points: 30, league: 'League 2' },
  { church: 'Church D', points: 40, league: 'League 2' },
  { church: 'Church E', points: 50, league: 'League 3' },
];

// Function to populate the database
const populateDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Drops and recreates the table
    await Leaderboard.bulkCreate(sampleData);
    console.log('Database populated with sample data');
    process.exit();
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
};

populateDatabase();
