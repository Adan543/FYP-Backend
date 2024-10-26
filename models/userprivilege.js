'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPrivilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserPrivilege.belongsTo(models.User, {foreignKey:'id'})
      UserPrivilege.belongsTo(models.Privilege, {foreignKey:'id'})
    }
  }
  UserPrivilege.init({
    user_id: DataTypes.INTEGER,
    privilege_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:'userprivileges',
    modelName: 'UserPrivilege',
  });
  return UserPrivilege;
};