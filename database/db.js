import Sequelize from 'sequelize';

export const sequelize = new Sequelize('asistencia', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3308'
})

/* export const sequelize = new Sequelize('mysql://root:KdVKFhRUVC9fekeolnkl@containers-us-west-37.railway.app:5469/railway') */