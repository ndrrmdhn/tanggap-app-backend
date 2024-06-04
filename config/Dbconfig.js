import {Sequelize} from "sequelize";

const db = new Sequelize('pengaduan','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
