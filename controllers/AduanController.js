
const { response} = require('../helpers/response.formatter');
const { User, Aduan } = require('../models');

const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
    createAduan : async (req,res) => {
        try {
            
            //membuat schema untuk validasi
            const schema = {
                judul: {
                    type: "string",
                },
                lokasi: {
                    type: "string",
                },
                uraian: {
                    type: "string",
                },
                foto: {
                    type: "string",
                },
                tanggapan: {
                    type: "string",
                },
                status: {
                    type: "string"
                },
                userId : {
                    type : "string"
                }

            };

            //buat object item
            let aduanCreateObj = {
                userId: req.body.userId,
                judul: req.body.judul,
                lokasi: req.body.lokasi,
                uraian: req.body.uraian,
                foto: req.body.foto,
                tanggapan: req.body.tanggapan,
                status : req.body.status
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(aduanCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'Validasi Form Gagal', validate));
                return;
            }

            //buat item
            let aduanCreate = await Aduan.create(aduanCreateObj);

            //response menggunakan helper response.formatter
            res.status(201).json(response(201, 'Data aduan berhasil disimpan', aduanCreate));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    getAduanAll : async (req,res) => {
        try {
            let aduanGets = await Aduan.findAll({
               
                include : {
                    model : User,
                }
            });

        //response menggunakan helper response.formatter
        res.status(200).json(response(200,'Berhasil', aduanGets));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },


    getAduanById : async (req,res) => {
        try{

            let aduanGet = await Aduan.findOne({
                where : {
                    id : req.params.id
                },
                include : {
                    model : User,
                }
            });

            //cek jika item tidak ada
            if(!aduanGet){
                res.status(404).json(response(404,'Oops! Data tidak ditemukan'));
                return;
            }

            //cek apakah admin yang akses adalah yang membuat itemnya
            if(aduanGet.userId != req.body.userid){
                res.status(403).json(response(403,'Terjadi Kesalahan! Anda tidak dapat mengakses data ini.'));
                return;
            }

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'berhasil', aduanGet));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mengupdate item berdasarkan id
    updateAduan : async (req, res) => {
        try {
            //mendapatkan data item untuk pengecekan
            let aduanGet = await Aduan.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data item ada
            if(!aduanGet){
                res.status(404).json(response(404,'Data aduan tidak ditemukan'));
                return;
            }

            //cek apakah admin yang akses adalah yang membuat itemnya
            if(aduanGet.userId != req.body.userId){
                res.status(403).json(response(403,'Terjadi Kesalahan! Anda tidak dapat mengakses data ini'));
                return;
            }

             //membuat schema untuk validasi
            const schema = {
                judul: {
                    type: "string",
                },
                lokasi: {
                    type: "string",
                },
                uraian: {
                    type: "string",
                },
                foto: {
                    type: "string",
                },
                tanggapan: {
                    type: "string",
                },
                status: {
                    type: "string"
                },
            }

             //buat object item
             let aduanUpdateObj = {
                judul: req.body.judul,
                lokasi: req.body.lokasi,
                uraian: req.body.uraian,
                foto: req.body.foto,
                tanggapan: req.body.tanggapan,
                status : req.body.status
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(aduanUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'Validasi Form Gagal', validate));
                return;
            }

            //update item
            await Aduan.update(aduanUpdateObj, {
                where:{
                    id: req.params.id,
                    userId : req.body.userId,
                }
            })

            let itemAfterUpdate = await Aduan.findOne({
                where:{
                    id: req.params.id,
                    userId : req.body.userId,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'Update Aduan Berhasil', itemAfterUpdate));
            
        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }   
    },

    deleteAduan: async (req, res) => {
        try {

            //mendapatkan data item untuk pengecekan
            let aduanGet = await Aduan.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data item ada
            if(!aduanGet){
                res.status(404).json(response(404,'Data tidak ditemukan'));
                return;
            }

            //cek apakah admin yang akses adalah yang membuat itemnya
            if(aduanGet.userId != req.body.userid){
                res.status(403).json(response(403,'Terjadi Kesalahan! Anda tidak dapat mengakses data ini'));
                return;
            }

            await Aduan.destroy({
                where:{
                    id: req.params.id,
                    userId : req.body.userid
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'berhasil'));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    }
}