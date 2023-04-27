const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo Diet
module.exports = (sequelize) => {
  sequelize.define('Diet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};