const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('ecommerce', 'admin', 'b3v1566700844', {
  host: 'database-2.cluo642yi1q5.us-east-2.rds.amazonaws.com', 
  dialect: 'mysql',
  port: 3306,
  logging: false, 
});

module.exports = sequelize;
