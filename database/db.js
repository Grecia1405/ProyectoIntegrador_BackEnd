import Sequelize from 'sequelize';

export const sequelize = new Sequelize('asistencia', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3308'
})