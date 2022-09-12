import jwt from 'jsonwebtoken';

export const generarJsonWebToken = (id, email, name) => {

    return new Promise((resolve, reject) => {

        const payload = { id, email, name };

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