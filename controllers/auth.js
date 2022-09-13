import { response } from "express"
import { generarJsonWebToken } from "../helpers/jwt.js";
import bcrypt from 'bcrypt';

/* Modelos */
import { Usuario } from "../models/Usuario.js";


export const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).send({
                ok: false,
                msg: 'El email ingresado no existe.'
            })
        }

        //Confirmar los passwords
        const confirmarPassword = bcrypt.compareSync(password, usuario.password);

        if (!confirmarPassword) {
            return res.status(400).send({
                ok: false,
                msg: 'La contraseña es incorrecta.'
            })
        }

        //Generando JWT
        const token = await generarJsonWebToken(usuario.idUsuario, usuario.email, usuario.nombre, usuario.actividad_usuario, usuario.idArea, usuario.tipo);

        res.status(200).send({
            ok: true,
            msg: 'Login',
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre,
            email: usuario.email,
            actividad_usuario: usuario.actividad_usuario,
            idArea: usuario.idArea,
            tipo: usuario.tipo,
            token
        })

    } catch (error) {
        res.status(500).send({
            ok: true,
            msg: 'Por favor, contacte al administrador'
        })
    }

}

export const revalidarToken = async (req, res = response) => {

    const { idUsuario, email, nombre, actividad_usuario, idArea, tipo } = req;

    const token = await generarJsonWebToken(idUsuario, email, nombre, actividad_usuario, idArea, tipo);

    res.status(200).send({
        ok: true,
        idUsuario,
        email,
        nombre,
        actividad_usuario,
        idArea,
        tipo,
        token
    })
}
