import { Sequelize } from "sequelize";
import db from "../config/Dbconfig.js";

const {DataTypes} = Sequelize;

const Berita = db.define('berita',{
    judul : DataTypes.STRING,
    isi : DataTypes.STRING,
    foto : DataTypes.STRING
},{
    freezeTableName : true
});

export default Berita;
(async() =>{
    await db.sync();
})();