'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Privilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Privilege.init({
    summarization: DataTypes.BOOLEAN,
    ocr: DataTypes.BOOLEAN,
    translation: DataTypes.BOOLEAN,
    text_to_speech: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Privilege',
  });
  return Privilege;
};