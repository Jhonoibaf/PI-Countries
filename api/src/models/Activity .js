const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("1","2","3","4","5"),
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    season: {
      type: DataTypes.ENUM("Verano","Otoño","Invierno","Primavera"),
      allowNull: false,
    },
    temporada: {
      type: DataTypes.ENUM("Alta","Media","Baja",),
      allowNull: false,
    },
  });
};