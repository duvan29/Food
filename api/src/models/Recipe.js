// Importamos los DataTypes desde Sequelize
const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo Recipe
module.exports = (sequelize) => {
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      vadation: {
        isUrl:true
      }
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stepByStep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

