import { response } from 'express'
import jwt from 'jsonwebtoken'

export const validarJWT = (req, res = response, next) => {

    //x-token ---> Headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { idUsuario, email, nombre, actividad_usuario, idArea, tipo } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.idUsuario = idUsuario;
        req.email = email;
        req.nombre = nombre;
        req.actividad_usuario = actividad_usuario,
            req.idArea = idArea,
            req.tipo = tipo

    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    }

    next();


}