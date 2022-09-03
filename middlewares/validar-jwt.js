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

        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        console.log(payload);

    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: 'Token inválido'
        })
    }

    next();


}