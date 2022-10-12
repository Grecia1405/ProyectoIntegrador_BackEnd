import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'

export const Estado = sequelize.define('estado', {
    idEstado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})