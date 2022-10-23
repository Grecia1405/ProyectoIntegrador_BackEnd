import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../database/db.js'

export const Actividad = sequelize.define('actividad', {
    idActividad: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    idUsuario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'idUsuario'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ingreso_actividad: {
        type: DataTypes.TIME,
        allowNull: false
    },
    salida_actividad: {
        type: DataTypes.TIME,
        allowNull: false
    },
    inicio_actividad: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fin_actividad: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    createdByUser: {
        type: DataTypes.UUID
    },
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    estado: {
        type: DataTypes.CHAR(1),
        defaultValue: 0,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})