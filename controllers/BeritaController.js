
const { response} = require('../helpers/response.formatter');
const { Berita } = require('../models');

const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
    createBerita : async (req,res) => {
        try {
            
            //membuat schema untuk validasi
            const schema = {
                judul: {
                    type: "string",
                },
                isi: {
                    type: "string",
                },
                foto: {
                    type: "string",
                },

            };

            //buat object item
            let BeritaCreateObj = {
                judul: req.body.judul,
                isi: req.body.isi,
                foto: req.body.foto,
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(BeritaCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'Validasi Form Gagal', validate));
                return;
            }

            //buat item
            let beritaCreate = await Berita.create(BeritaCreateObj);

            //response menggunakan helper response.formatter
            res.status(201).json(response(201, 'Data Berita berhasil disimpan', beritaCreate));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    getBeritaAll : async (req,res) => {
        try {
            let BeritaGets = await Berita.findAll();

        //response menggunakan helper response.formatter
        res.status(200).json(response(200,'Berhasil', BeritaGets));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },


    getBeritaById : async (req,res) => {
        try{

            let BeritaGet = await Berita.findOne({
                where : {
                    id : req.params.id
                }
            });

            //cek jika item tidak ada
            if(!BeritaGet){
                res.status(404).json(response(404,'Oops! Data tidak ditemukan'));
                return;
            }

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'berhasil', BeritaGet));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    updateBerita : async (req, res) => {
        try {
            //mendapatkan data item untuk pengecekan
            let BeritaGet = await Berita.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data item ada
            if(!BeritaGet){
                res.status(404).json(response(404,'Data Berita tidak ditemukan'));
                return;
            }

            const schema = {
                judul: {
                    type: "string",
                },
                isi: {
                    type: "string",
                },
                foto: {
                    type: "string",
                },

            };

             //buat object item
             let BeritaUpdateObj = {
                judul: req.body.judul,
                isi: req.body.isi,
                foto: req.body.foto,
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(BeritaUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'Validasi Form Gagal', validate));
                return;
            }

            //update item
            await Berita.update(BeritaUpdateObj, {
                where:{
                    id: req.params.id
                }
            })

            let itemAfterUpdate = await Berita.findOne({
                where:{
                    id: req.params.id
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'Update Berita Berhasil', itemAfterUpdate));
            
        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }   
    },

    deleteBerita: async (req, res) => {
        try {

            //mendapatkan data item untuk pengecekan
            let BeritaGet = await Berita.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data item ada
            if(!BeritaGet){
                res.status(404).json(response(404,'Data tidak ditemukan'));
                return;
            }


            await Berita.destroy({
                where:{
                    id: req.params.id
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