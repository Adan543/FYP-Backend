'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize, DataTypes} = require('sequelize');
const basename = path.basename(__filename);
const dbConfig = require('../config/server.config').dev;
const db = {};
let sequelize;


try {
    sequelize = new Sequelize(
        dbConfig.DB,
        dbConfig.USERNAME, 
        dbConfig.PASS,
        {
        host: dbConfig.HOST,
        dialect: 'mysql',
        
        pool: dbConfig.pool
      });
      console.log(dbConfig.dialect);
      
      
      fs
        .readdirSync(__dirname)
        .filter(file => {
          return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
          );
        })
        .forEach(file => {
          const model = require(path.join(__dirname, file))(sequelize, DataTypes);
          db[model.name] = model;
        });
      
      Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });
      console.log(`${sequelize.config.database} DB connected succesfully`)
} catch (error) {
    console.log('error :>> ', error);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
