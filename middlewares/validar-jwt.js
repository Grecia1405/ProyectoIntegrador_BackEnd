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

        const { id, email, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.id = id;
        req.email = email;
        req.name = name;

    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    }

    next();


}