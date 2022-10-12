import { response } from "express"
import { Actividad } from "../models/Actividad.js";
import { Area } from "../models/Area.js";
import { Usuario } from "../models/Usuario.js"


export const obtenerActividades = async (req, res = response) => {

    let actividades_All = await Actividad.findAll({
        include:
        {
            model: Usuario,
            as: 'usuario'
        },
        attributes: { exclude: ['idUsuario'] }
    });
    res.status(200).json({
        actividades_All
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

    /* const { name, email, password } = req.body; */
    /* const actividad = await Actividad.create(req.body); */

    const excelData = req.body;

    excelData.map(dataItem => {
        Actividad.create(dataItem);
    })

    console.log(excelData);

    res.status(200).json({
        ok: true
    })
}

export const editarActividad = async (req, res = response) => {

    /* const { name, email, password } = req.body; */
    const actividad = await Actividad.update(req.body, {
        where: { idActividad: req.params.id }
    });

    console.log(req.body);

    res.status(200).json({
        ok: true,
        actividad
    })
}


export const eliminarActividad = async (req, res = response) => {

    /* const { name, email, password } = req.body; */
    const actividad = await Actividad.destroy({
        where: { idActividad: req.params.id }
    });

    console.log(req.body);

    res.status(200).json({
        ok: true,
        actividad
    })
}