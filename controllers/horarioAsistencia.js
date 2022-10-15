import { response } from "express"
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
