/* Proyecto Asistencia */
import { Actividad } from "../models/Actividad.js";
import { Area } from "../models/Area.js";
import { Estado } from "../models/Estado.js";
import { Horario_Asistencia } from "../models/Horario_Asistencia.js";
import { Usuario } from "../models/Usuario.js";

/* Proyecto Asistencia */

//Un área tiene muchos usuarios
Area.hasMany(Usuario, { as: 'usuario', foreignKey: 'idArea' });
//Un usuario solo pertenece a un área
Usuario.belongsTo(Area, { as: 'area', foreignKey: 'idArea', targetKey: 'idArea' });

//Un usuario tiene una actividad
Usuario.hasOne(Actividad, { as: 'actividad', foreignKey: 'idUsuario' });
//Una actividad pertenece a un usuario
Actividad.belongsTo(Usuario, { as: 'usuario', foreignKey: 'idUsuario', targetKey: 'idUsuario' });

//Una actividad tiene muchos horarios
Actividad.hasMany(Horario_Asistencia, { as: 'horario_asistencia', foreignKey: 'idActividad' });
//Muchos horarios pertenecen a una actividad
Horario_Asistencia.belongsTo(Actividad, { as: 'actividad', foreignKey: 'idActividad', targetKey: 'idActividad' });

//Un estado pertenece a un horario
Estado.hasOne(Horario_Asistencia, { as: 'horario_asistencia', foreignKey: 'idEstado' });
//Una actividad tiene un estado
Horario_Asistencia.belongsTo(Estado, { as: 'estado', foreignKey: 'idEstado', targetKey: 'idEstado' });  