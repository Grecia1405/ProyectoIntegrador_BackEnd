import { response } from "express"
import { Actividad } from "../models/Actividad.js";
import { Usuario } from "../models/Usuario.js"


export const obtenerActividades = async (req, res = response) => {

    let actividades_All = await Actividad.findAll({
        include:
        {
            model: Usuario,
            as: 'usuario'
        },
    });
    res.status(200).json({
        actividades_All
    })
}

export const obtenerActividad = async (req, res = response) => {

    const idUsuario = req.params.id;

    let actividadById_All = await Actividad.findAll({
        where: { idUsuario: idUsuario },
        include:
        {
            model: Usuario,
            as: 'usuario'
        },
        attributes: { exclude: ['idUsuario'] }
    });
    res.status(200).json({
        actividadById_All
    })
}

export const crearActividad = async (req, res = response) => {

    try {
        const actividad = await Actividad.create(req.body);

        res.status(200).json({
            ok: true,
            actividad
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contacte al administrador.'
        })
    }


}

export const crearActividades = async (req, res = response) => {

    const excelData = req.body;

    excelData.map(dataItem => {
        Actividad.create(dataItem);
    })

    res.status(200).json({
        ok: true
    })
}

export const editarActividad = async (req, res = response) => {

    const actividad = await Actividad.update(req.body, {
        where: { idActividad: req.params.id }
    });

    res.status(200).json({
        ok: true,
        actividad
    })
}


export const eliminarActividad = async (req, res = response) => {

    const actividad = await Actividad.destroy({
        where: { idActividad: req.params.id }
    });

    res.status(200).json({
        ok: true,
        actividad
    })
}