'use strict';
const {
  Model
} = require('sequelize');
const { USE } = require('sequelize/lib/index-hints');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserHistories, {foreignKey:'user_id'})
      User.hasOne(models.UserRole, {foreignKey:'user_id'})
      User.hasOne(models.UserPrivilege, {foreignKey:'user_id'})
      User.hasOne(models.UserPackage, {foreignKey:'user_id'})
    }
  }
  User.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};