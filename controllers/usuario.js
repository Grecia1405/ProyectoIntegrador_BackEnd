import { response } from "express"
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

import { Op } from "sequelize";

/* Modelos */
import { Area } from "../models/Area.js";
import { Usuario } from "../models/Usuario.js";

export const obtenerUsuario = async (req, res = response) => {

    try {
        let usuario = await Usuario.findOne({

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
        order: [['nombre', 'ASC']],
        attributes: { exclude: ['idArea'] }
    });

    res.status(200).json({
        ok: true,
        usuarios_All
    })
}

export const registrarUsuario = async (req, res = response) => {

    const { email, password } = req.body;

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
        const usuario = await Usuario.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fec_nacimiento: req.body.fec_nacimiento,
            dni: req.body.dni,
            email: req.body.email,
            tipo: req.body.tipo,
            tarifa_hora: req.body.tarifa_hora,
            actividad_usuario: req.body.actividad_usuario,
            createdByUser: req.body.createdByUser,
            updatedByUser: req.body.updatedByUser,
            idArea: req.body.idArea,
        }, {
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

export const actualizarPassword = async (req, res = response) => {

    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const newPassword = req.body.password;

    try {
        const usuario = await Usuario.update({
            password: newPassword
        }, {
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

export const restaurarUsuario = async (req, res = response) => {

    const user = await Usuario.update({ actividad_usuario: 0 }, {
        where: { idUsuario: req.params.id }
    });

    res.status(200).json({
        ok: true,
        message: 'Se restauró el usuario',
        user
    })
}

export const resetpassword = async (req, res = response) => {

    const { dni, email } = req.body;

    try {
        //Comprobamos si el email y dni pertenecen a un usuario
        let usuario = await Usuario.findOne(
            {
                where: {
                    [Op.and]: [
                        {
                            "dni": { [Op.eq]: dni }
                        },
                        {
                            "email": { [Op.eq]: email }
                        }
                    ]
                }
            });

        if (usuario == null) {
            return res.status(400).send({
                ok: false,
                msg: `El DNI y el email no están vinculados.`
            })
        }

        // Generamos una contraseña aleatoria
        const primeraPalabra = ['reptilia', 'notthesameanymore', 'atthedoor', 'lastnite', 'youonlyliveonce', 'hardtoexplain', 'someday', 'selfless', 'isthisit', 'takeitorleaveit', 'themodernage', 'barelylegal', 'soma', 'automaticstop', 'takenforafool', 'callmeback', 'games', 'undercoverofdarkness'];
        const segundaPalabra = ['123', '456', '789', '321', '654', '987', '111', '222', '333', '444', '555', '666', '777', '888', '999', '159', '753', '486', '258', '214'];
        const imagenes = ['https://media.tenor.com/6FA7eX2JskwAAAAC/celebration-gastby.gif', 'https://c.tenor.com/iHXx1jpq51UAAAAC/cheers-leonardo-di-caprio.gif',
            'https://media.tenor.com/AZdWIW_F0McAAAAd/confetti-celebration.gif', 'https://media.tenor.com/v4FpeS4fxBUAAAAC/celebration-celebrate.gif'
        ];

        const randomPrimera = Math.floor(Math.random() * primeraPalabra.length);
        const randomSegunda = Math.floor(Math.random() * segundaPalabra.length);
        const randomImagen = Math.floor(Math.random() * imagenes.length);

        const passwordGenerado = primeraPalabra[randomPrimera] + segundaPalabra[randomSegunda];
        const imagenGenerada = imagenes[randomImagen];

        // Mandamos un email al correo enviado desde el formulario
        let respuesta = await sendEmail(usuario.nombre, usuario.apellido, passwordGenerado, email, imagenGenerada);

        if (respuesta) {
            // Encriptamos la contraseña
            let salt = bcrypt.genSaltSync();
            let passwordReseted = bcrypt.hashSync(passwordGenerado, salt);

            let usuarioUpdated = await Usuario.update({
                password: passwordReseted
            }, {
                where: { idUsuario: usuario.idUsuario }
            });

            res.status(200).send({
                ok: true,
                msg: 'Su nueva contraseña ha sido enviada.'
            })
        }

    } catch (error) {
        res.status(500).send({
            ok: true,
            msg: 'El DNI ingresado no existe en la base de datos',
            error
        })
    }
}

const sendEmail = async (nombre, apellido, password, email, imagenGenerada) => {
    const config = {
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    }

    const mensaje = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Contraseña restablecida',
        html: `<h1 style="color:#2563eb;">Buen día, ${nombre} ${apellido}. 👋</h1>        
        <h3 style="font-size:18px;">Acaba de realizar una solicitud para restablecer su contraseña. </h3> <p style="font-size:18px;">Su nueva contraseña es: <b>${password}</b></p> 
        <img src=${imagenGenerada}/>`,
    }

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje);

    return info;

}