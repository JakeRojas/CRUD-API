const config = require('config.json'); //Calling the file that contains the database connection details.
const mysql = require('mysql2/promise'); //Importing a library use to handle the connection and queries.
const { Sequelize } = require('sequelize'); //Importing a library use to interact your database.

module.exports = db = {}; //Exports an empty object "db" to hold your database models.

initialize(); //Function that sets-up the database.

async function initialize() { 
    const { host, port, user, password, database } = config.database; //Extracting the database configuration from config.json.
    const connection = await mysql.createConnection({ host, port, user, password }); //Establishes a connection to the MySQL server using the mysql2 library.
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`); //Executes a query to create the database if it doesn't already exist.
    
    await connection.end();

    const sequelize = new Sequelize(database, user, password, { host: 'localhost', dialect: 'mysql' });

    db.User = require('../users/user.model')(sequelize);
    db.ActivityLog = require('../models/activitylog.model')(sequelize);

    await sequelize.sync({ alter: true });
}