const { Sequelize } = require('sequelize');
const config = require('./config.json'); // Adjust the path if necessary

// Get the environment (development, test, production)
const env = process.env.NODE_ENV || 'development';

// Get the database configuration for the current environment
const { username, password, database, host, dialect } = config[env];

// Create a new Sequelize instance
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    timezone: '+05:30', // Set to IST
});

// Test the connection (optional)
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize; // Export the sequelize instance
