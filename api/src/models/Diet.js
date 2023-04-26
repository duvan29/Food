const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo Diet
module.exports = (sequelize) => {
    sequelize.define('Diet', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  };