import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'

export const Horario_Asistencia = sequelize.define('horario_asistencia', {
    idHorarioAsistencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idActividad: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Actividad',
            key: 'idActividad'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    idUsuario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Actividad',
            key: 'idUsuario'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    fechaAsistencia: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora_ingreso: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    hora_salida: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    idEstado: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        references: {
            model: 'Estado',
            key: 'idEstado'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    freezeTableName: true,
    timestamps: false
})