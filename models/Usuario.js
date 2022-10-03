import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../database/db.js'

export const Usuario = sequelize.define('usuario', {
  idUsuario: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fec_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dni: {
    type: DataTypes.CHAR(8),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.CHAR(1),
    defaultValue: 0,
    allowNull: false
  },
  tarifa_hora: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    allowNull: false
  },
  actividad_usuario: {
    type: DataTypes.CHAR(1),
    defaultValue: 0,
    allowNull: false
  },
  createdByUser: {
    type: DataTypes.UUID
  },
  updatedByUser: {
    type: DataTypes.UUID
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }/* ,
  idArea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Area',
      key: 'idArea'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  } */
}, {
  freezeTableName: true,
  timestamps: true
})