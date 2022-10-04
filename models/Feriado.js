import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'

export const Feriado = sequelize.define('feriado', {
    idFeriado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    anio: {
        type: DataTypes.CHAR(4),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})