import Berita from "../models/BeritaModel.js";

export const getBerita = async(req, res) => {
    try {
        const response = await Berita.findAll();
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}


export const getBeritaById = async(req, res) => {
    try {
        const response = await Berita.findOne({
            where : {
                id : req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}


export const createBerita = async(req, res) => {
    try {
        await Berita.create(req.body);
        res.status(201).json({msg: "Berita Created"});
    } catch (error) {
        console.log(error.message);
    }
}


export const updateBerita = async(req, res) => {
    try {
        await Berita.update(req.body,{
            where : {
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Berita Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBerita = async(req, res) => {
    try {
        await Berita.destroy({
            where : {
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Berita Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}