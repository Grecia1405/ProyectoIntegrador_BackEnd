import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'

export const Area = sequelize.define('area', {
    idArea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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