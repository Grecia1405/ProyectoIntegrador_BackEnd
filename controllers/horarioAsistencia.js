import { response } from "express"
import bcrypt from 'bcrypt';
import { Op } from "sequelize";
import { Actividad } from "../models/Actividad.js";
import { Estado } from "../models/Estado.js";
import { Horario_Asistencia } from "../models/Horario_Asistencia.js";
import { Usuario } from "../models/Usuario.js"


export const obtenerHorarioAsistencia = async (req, res = response) => {

    let horario_asistencia_All = await Horario_Asistencia.findAll({
        include:
            [{
                model: Actividad,
                as: 'actividad'
            },
            {
                model: Estado,
                as: 'estado'
            }
            ],
        order: [['fechaAsistencia', 'ASC']],
        attributes: { exclude: ['idActividad', 'idUsuario', 'idEstado'] }
    });
    res.status(200).json({
        horario_asistencia_All
    })
}

export const obtenerHorarioAsistenciaByDate = async (req, res = response) => {

    const { startDate, endDate } = req.body;

    let horario_asistencia_All = await Horario_Asistencia.findAll({
        include:
            [{
                model: Actividad,
                as: 'actividad'
            },
            {
                model: Estado,
                as: 'estado'
            }
            ],
        where: { "fechaAsistencia": { [Op.between]: [startDate, endDate] } },
        order: [['fechaAsistencia', 'ASC']],
        attributes: { exclude: ['idActividad', 'idUsuario', 'idEstado'] }
    });
    res.status(200).json({
        horario_asistencia_All
    })
}


export const crearHorarioAsistencia = async (req, res = response) => {

    try {
        const horario_asistencia = await Horario_Asistencia.create(req.body);

        res.status(200).json({
            ok: true,
            horario_asistencia
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contacte al administrador.'
        })
    }
}

export const obtenerHorarioAsistenciaById = async (req, res = response) => {

    console.log(req.params.id);

    try {
        let horario = await Horario_Asistencia.findOne({
            include: [
                {
                    model: Actividad,
                    as: 'actividad'
                }
            ],
            attributes: { exclude: ['idActividad'] },
            where: { idHorarioAsistencia: req.params.id }
        })

        res.status(200).json({
            ok: true,
            horario
        })

    } catch (error) {
        return res.status(404).send({
            ok: false,
            msg: `El horario no existe.`
        })
    }
}

export const marcarHorarioAsistencia = async (req, res = response) => {

    const { email, password, hora_ingreso, hora_salida, estado } = req.body;

    try {
        let usuario = await Usuario.findOne({ where: { email } });

        console.log(usuario);

        if (!usuario) {
            return res.status(400).send({
                ok: false,
                msg: 'El email ingresado no existe.'
            })
        }

        //Confirmar los passwords
        const confirmarPassword = bcrypt.compareSync(password, usuario.password);

        console.log(confirmarPassword);

        if (!confirmarPassword) {
            return res.status(400).send({
                ok: false,
                msg: 'La contraseña es incorrecta.'
            })
        }

        let horarioAsistencia = await Horario_Asistencia.update({
            hora_salida,
            hora_ingreso,
            idEstado: estado
        }, {
            where: { idHorarioAsistencia: req.params.id }
        });

        res.status(200).send({
            ok: true,
            horarioAsistencia
        })

    } catch (error) {
        res.status(500).send({
            ok: true,
            msg: 'Por favor, contacte al administrador'
        })
    }

}

export const marcarFaltaAsistencia = async (req, res = response) => {

    const { estado } = req.body;

    console.log(estado);

    try {
        let horarioAsistencia = await Horario_Asistencia.update({
            idEstado: estado
        }, {
            where: { idHorarioAsistencia: req.params.id }
        });

        res.status(200).send({
            ok: true,
            horarioAsistencia
        })

    } catch (error) {
        res.status(500).send({
            ok: true,
            msg: 'Por favor, contacte al administrador'
        })
    }

}

export const marcarAutoSalidaAsistencia = async (req, res = response) => {

    const { hora_salida } = req.body;

    console.log(hora_salida);

    try {
        let horarioAsistencia = await Horario_Asistencia.update({
            hora_salida: hora_salida
        }, {
            where: { idHorarioAsistencia: req.params.id }
        });

        res.status(200).send({
            ok: true,
            horarioAsistencia
        })

    } catch (error) {
        res.status(500).send({
            ok: true,
            msg: 'Por favor, contacte al administrador'
        })
    }

}