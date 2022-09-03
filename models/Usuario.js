import { DataTypes } from 'sequelize'
import { sequelize } from '../database/db.js'

export const Usuario = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
})