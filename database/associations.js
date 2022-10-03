/* Proyecto Asistencia */

import { Area } from "../models/Area.js";
import { Usuario } from "../models/Usuario.js";

//Un área tiene muchos usuarios
Area.hasMany(Usuario, { as: 'usuario', foreignKey: 'idArea' });
//Un usuario solo pertenece a un área
Usuario.belongsTo(Area, { as: 'area', foreignKey: 'idArea', targetKey: 'idArea' });