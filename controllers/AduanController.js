import Aduan from "../models/AduanModel.js";
import User from "../models/UserModel.js";
import db from "../config/Dbconfig.js";

export const getAduan = async(req, res) => {
    try {
        const response = await db.query(`SELECT aduan.*, CONCAT(users.nama_depan, '', users.nama_belakang) AS namapengguna FROM aduan JOIN users ON users.id = aduan.userId WHERE aduan.status = '${req.params.status}'`);

        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}


export const getAduanById = async(req, res) => {
    try {
        const response = await Aduan.findOne({
            where : {
                id : req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}


export const createAduan = async(req, res) => {
    try {
        await Aduan.create(req.body);
        res.status(201).json({msg: "Aduan Has been Created"});
    } catch (error) {
        console.log(error.message);
    }
}


export const updateAduan = async(req, res) => {
    try {
        await Aduan.update(req.body,{
            where : {
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Aduan has been Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAduan = async(req, res) => {
    try {
        await Aduan.destroy({
            where : {
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Aduan has been Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}
