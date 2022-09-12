import { response } from "express"
import { Usuario } from "../models/Usuario.js";
import { generarJsonWebToken } from "../helpers/jwt.js";
import bcrypt from 'bcrypt';

export const registrarUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ where: { email } });

        console.log(usuario);

        if (usuario) {
            return res.status(400).send({
                ok: false,
                msg: `Ya existe una cuenta con ese email.`
            })
        }
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await Usuario.create({
            name: usuario.name,
            password: usuario.password,
            email: usuario.email
        });

        //Generando JWT
        const token = await generarJsonWebToken(usuario.id, usuario.email, usuario.name);

        res.status(201).send({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        res.status(500).send({
            ok: true,
            msg: 'Por favor, contacte al administrador'
        })
    }
}

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
        const token = await generarJsonWebToken(usuario.id, usuario.email, usuario.name);

        res.status(200).send({
            ok: true,
            msg: 'Login',
            name: usuario.name,
            id: usuario.id,
            email: usuario.email,
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

    const { id, email, name } = req;

    const token = await generarJsonWebToken(id, email, name);

    res.status(200).send({
        ok: true,
        id,
        email,
        name,
        token
    })
}
