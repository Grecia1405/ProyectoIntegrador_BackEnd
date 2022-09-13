import { DataTypes } from 'sequelize'
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
    type: DataTypes.DATE,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
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
    type: DataTypes.CHAR,
    defaultValue: 0,
    allowNull: false
  },
  tarifa_hora: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
    allowNull: false
  },
  actividad_usuario: {
    type: DataTypes.CHAR,
    defaultValue: 0,
    allowNull: false
  },
  idArea: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Area',
      key: 'idArea'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  freezeTableName: true,
  timestamps: false
})