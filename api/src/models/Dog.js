const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo

    // No recuerdo si hay que crear la entidad/tabla dogs, lo comento por si acaso
    /*     
    sequelize.define('dog', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
     */

    sequelize.define('temperaments', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    sequelize.define('breeds', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        heightmin: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        heightmax: {
            type: DataTypes.FLOAT,
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
        years: {
            type: DataTypes.INTEGER
        }
    })
};