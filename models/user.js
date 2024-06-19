'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //relasi dengan table items
      User.hasMany(models.Aduan, {
        foreignKey: 'userId',
      });

    }
  }

  User.init({
    nama_depan: DataTypes.STRING,
    nama_belakang: DataTypes.STRING,
    password: DataTypes.STRING,
    email : DataTypes.STRING,
    aktif : DataTypes.STRING,
    level :  DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};