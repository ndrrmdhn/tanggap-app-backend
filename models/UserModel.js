import { Sequelize } from "sequelize";
import db from "../config/Dbconfig.js";

const {DataTypes} = Sequelize;

const User = db.define('users',{
    nama_depan : DataTypes.STRING,
    nama_belakang : DataTypes.STRING,
    email : DataTypes.STRING,
    level : DataTypes.STRING,
    aktif : DataTypes.STRING,
    password : DataTypes.STRING
});

export default User;
(async() =>{
    await db.sync();
})();