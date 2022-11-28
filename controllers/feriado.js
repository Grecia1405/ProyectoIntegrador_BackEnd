import { response } from "express"

/* Modelos */
import { Feriado } from "../models/Feriado.js";

export const obtenerFeriado = async (req, res = response) => {

    try {
        let feriado = await Feriado.findOne({
            where: { idFeriado: req.params.id }
        })

        res.status(200).json({
            ok: true,
            feriado
        })

    } catch (error) {
        return res.status(404).send({
            ok: false,
            msg: `El feriado no existe.`
        })
    }
}

export const obtenerFeriados = async (req, res = response) => {

    let feriados_All = await Feriado.findAll();


    res.status(200).json({
        ok: true,
        feriados_All
    })
}

export const registrarFeriado = async (req, res = response) => {

    const { anio, fecha, descripcion } = req.body;

    try {

        let feriado = new Feriado(req.body);

        await Feriado.create({
            ...req.body
        });

        res.status(201).send({
            ok: true,
            feriado
        })

    } catch (error) {
        res.status(500).send({
            ok: true,
            msg: 'Por favor, contacte al administrador',
            error
        })
    }
}

export const actualizarFeriado = async (req, res = response) => {

    try {
        const feriado = await Feriado.update(req.body, {
            where: { idFeriado: req.params.id }
        });

        res.status(200).json({
            ok: true,
            feriado
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Por favor, contacte al administrador.'
        })
    }

}


export const eliminarFeriado = async (req, res = response) => {

    const feriado = await Feriado.destroy({
        where: { idFeriado: req.params.id }
    });

    res.status(200).json({
        ok: true,
        message: 'Se eliminó el feriado',
        feriado
    })
}