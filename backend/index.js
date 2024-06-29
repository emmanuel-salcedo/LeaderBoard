const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

// Database setup (assuming you have this already configured)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // You may need to adjust this for your configuration
    }
  }
});

// Define models
const Church = sequelize.define('Church', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Point = sequelize.define('Point', {
  value: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const League = sequelize.define('League', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relationships
Church.hasMany(Point);
Point.belongsTo(Church);

League.hasMany(Church);
Church.belongsTo(League);

// Routes (examples)
app.get('/', (req, res) => {
  res.send('Hello, this is the leaderboard app backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
