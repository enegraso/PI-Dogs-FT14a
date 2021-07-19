const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('breeds', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        heightmin: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        heightmax: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weightmin: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weightmax: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        yearsmin: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        yearsmax: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

    })
}