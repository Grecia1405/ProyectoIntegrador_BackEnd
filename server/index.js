import express from "express";
import { sequelize } from '../database/db.js';
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';

import auth from '../routes/auth.js';
import usuario from '../routes/usuario.js';

import '../database/associations.js'


//Crear el servidor de Express
const app = express();


//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Rutas
//TODO: auth // crear, login, token
app.use('/api/auth/', auth)

//TODO: asistencias: Eventos
app.use('/api/usuario/', usuario)


async function main() {
    try {
        await sequelize.sync();
        console.log('La conección a la BD ha sido exitosa.');

        //Escuchar peticiones
        app.listen(`${process.env.PORT}`);
        console.log(`Server escuchando en puerto ${process.env.PORT}`);

    } catch (error) {
        console.error('No se pudo conectar a la BD:', error);
    }
}

main();



