import { Sequelize } from "sequelize";
import db from "../config/Dbconfig.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize;

const Aduan = db.define('aduan',{
    judul : DataTypes.STRING,
    lokasi : DataTypes.STRING,
    uraian : DataTypes.STRING,
    foto : DataTypes.STRING,
    userId : DataTypes.INTEGER,
    status : DataTypes.STRING,
    tanggapan : DataTypes.STRING
},{
    freezeTableName : true
});


export default Aduan;
(async() =>{
    await db.sync();
})();