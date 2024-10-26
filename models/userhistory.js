'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserHistories.belongsTo(models.User, {foreignKey:'id'})
    }
  }
  UserHistories.init({
    user_id: DataTypes.INTEGER,
    page_visited: DataTypes.STRING
  }, {
    sequelize,
    tableName:'userhistories',
    modelName: 'UserHistories',
  });
  return UserHistories;
};