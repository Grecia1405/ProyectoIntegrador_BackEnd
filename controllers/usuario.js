import { response } from "express"
import { Usuario } from "../models/Usuario.js"

export const obtenerUsuarios = async (req, res = response) => {

    let usuarios_All = await Usuario.findAll();
    let lista_usuarios = []

    await usuarios_All.forEach(usuario => {

        let user_info = {
            "id": usuario.id,
            "name": usuario.name,
            "email": usuario.email,
            "password": usuario.password
        }

        lista_usuarios.push(user_info);

    });


    res.status(200).json({
        ok: true,
        lista_usuarios
    })
}