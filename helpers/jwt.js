import jwt from 'jsonwebtoken';

export const generarJsonWebToken = (idUsuario, email, nombre, actividad_usuario, idArea, tipo) => {

    return new Promise((resolve, reject) => {

        const payload = { idUsuario, email, nombre, actividad_usuario, idArea, tipo };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token.');
            }

            resolve(token);
        })

    })

}