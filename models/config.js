'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Config extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }

    Config.init({
        meta_key: DataTypes.STRING,
        meta_value: DataTypes.STRING,
        created_at: DataTypes.INTEGER,
        updated_at: DataTypes.INTEGER
    }, {
        sequelize,
        timestamps: false,
        tableName: 'config',
        modelName: 'config',
    });

    return Config;
};