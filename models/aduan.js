'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aduan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //relasi dengan table admins
      Aduan.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      
    }
  }
  Aduan.init({
    userId: DataTypes.INTEGER,
    judul: DataTypes.STRING,
    lokasi : DataTypes.STRING,
    uraian : DataTypes.STRING,
    foto : DataTypes.STRING,
    status : DataTypes.STRING,
    tanggapan : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aduan',
  });
  return Aduan;
};