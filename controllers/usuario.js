import { response } from "express"
import bcrypt from 'bcrypt';

import { Op } from "sequelize";

/* Modelos */
import { Area } from "../models/Area.js";
import { Usuario } from "../models/Usuario.js";

export const obtenerUsuario = async (req, res = response) => {

    console.log(req.params.id);

    try {
        let usuario = await Usuario.findOne({
            /* include: [
                {
                    model: Area,
                    as: 'area'
                }
            ],
            attributes: { exclude: ['idArea'] }, */
            where: { idUsuario: req.params.id }
        })

        res.status(200).json({
            ok: true,
            usuario
        })

    } catch (error) {
        return res.status(404).send({
            ok: false,
            msg: `El usuario no existe.`
        })
    }
}

export const obtenerUsuarios = async (req, res = response) => {

    let usuarios_All = await Usuario.findAll({
        include: [
            {
                model: Area,
                as: 'area'
            }
        ],
        attributes: { exclude: ['idArea'] }
    });


    res.status(200).json({
        ok: true,
        usuarios_All
    })
}

export const registrarUsuario = async (req, res = response) => {

    const { email, password, dni } = req.body;

    try {
        let usuario = await Usuario.findOne(
            {
                where: { email }
            });

        if (usuario) {
            return res.status(400).send({
                ok: false,
                msg: `El email ya existe.`
            })
        }
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await Usuario.create({
            ...req.body,
            password: usuario.password,
        });

        //Generando JWT
        //const token = await generarJsonWebToken(usuario.idUsuario, usuario.email, usuario.nombre, usuario.actividad_usuario, usuario.idArea, usuario.tipo);

        res.status(201).send({
            ok: true,
            usuario
        })

    } catch (error) {
        res.status(500).send({
            ok: true,
            msg: 'Por favor, contacte al administrador',
            error
        })
    }
}

export const actualizarUsuario = async (req, res = response) => {

    try {
        usuario = await Usuario.update(req.body, {
            where: { idUsuario: req.params.id }
        });

        res.status(200).json({
            ok: true,
            usuario
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Por favor, contacte al administrador.'
        })
    }

}


export const eliminarUsuario = async (req, res = response) => {

    const user = await Usuario.update({ actividad_usuario: 1 }, {
        where: { idUsuario: req.params.id }
    });

    res.status(200).json({
        ok: true,
        message: 'Se eliminó el usuario',
        user
    })
}