'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserPackage.belongsTo(models.User, {foreignKey:'id'})
      UserPackage.belongsTo(models.Package, {foreignKey:'id'})

    }
  }
  UserPackage.init({
    user_id: DataTypes.INTEGER,
    package_id: DataTypes.INTEGER,
    expire: DataTypes.DATE
  }, {
    sequelize,
    tableName:'userpackages',
    modelName: 'UserPackage',
  });
  return UserPackage;
};