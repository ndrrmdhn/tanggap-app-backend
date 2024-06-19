const { response} = require('../helpers/response.formatter');
const { User, Token } = require('../models');
const baseConfig = require('../config/base.config');
const passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");

const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //membuat admin baru
    createAdmin : async (req,res) => {
        try{

            //membuat schema untuk validasi
            const schema = {
                nama_depan :{
                    type : "string",
                    min : 3,
                },
                nama_belakang : {
                    type : "string",
                    min : 3
                },
                email :{
                    type : "email",
                },
                password :{
                    type : "string",
                    min : 5,
                },
                aktif : {
                    type : 'string',
                },
                level : {
                    type : 'string',
                }
            };

            const validate = v.validate({
                nama_depan : req.body.nama_depan,
                nama_belakang : req.body.nama_belakang,
                email : req.body.email,
                password : req.body.password,
                aktif : req.body.aktif,
                level : req.body.level
            }, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }
            let cekAdmin = await User.findOne({
                    where : {
                        email : req.body.email
                    }
                }
            );

            if(cekAdmin){
                res.status(409).json(response(409,'email already registered'));
                return;
            }

            let adminCreateObj = {
                nama_depan : req.body.nama_depan,
                nama_belakang : req.body.nama_belakang,
                email : req.body.email,
                password : req.body.password,
                aktif : req.body.aktif,
                level : req.body.level,
                password : passwordHash.generate(req.body.password), //hash password menggunakan module password-hash
            }

            let adminCreate = await User.create(adminCreateObj);

            res.status(201).json(response(201,'admin created', {
                nama_depan : req.body.nama_depan,
                nama_belakang : req.body.nama_belakang,
                email : req.body.email
            }));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },


     updateAdmin : async (req,res) => {
        try{

            //membuat schema untuk validasi
            const schema = {
                nama_depan :{
                    type : "string",
                    min : 3,
                },
                nama_belakang : {
                    type : "string",
                    min : 3
                },
                email :{
                    type : "email",
                },
                password :{
                    type : "string",
                    min : 5,
                },
                aktif : {
                    type : 'string',
                },
                level : {
                    type : 'string',
                }
            };

            const validate = v.validate({
                nama_depan : req.body.nama_depan,
                nama_belakang : req.body.nama_belakang,
                email : req.body.email,
            }, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            let cekAdmin = await User.findOne({
                    where : {
                        id : req.params.id
                    }
                }
            );

            if(cekAdmin){
                res.status(409).json(response(409,'User tidak ditemukan'));
                return;
            }

            if(req.body.password === "" || req.body.password === null){
                const passwordUser = cekAdmin[0].password;
            } else {
                const passwordUser = passwordHash.generate(req.body.password);
            }

            let adminCreateObj = {
                nama_depan : req.body.nama_depan,
                nama_belakang : req.body.nama_belakang,
                email : req.body.email,
                password : req.body.password,
                aktif : req.body.aktif,
                level : req.body.level,
                password : passwordUser, //hash password menggunakan module password-hash
            }

            let adminUpdate = await User.Update(adminCreateObj, {
                where : {
                    id : req.params.id
                }
            });

            res.status(201).json(response(201,'User Updated', {
                nama_depan : req.body.nama_depan,
                nama_belakang : req.body.nama_belakang,
                email : req.body.email
            }));

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },


    //login admin
    loginAdmin : async (req,res) => {
        try{

            //membuat schema untuk validasi
            const schema = {
                email :{
                    type : "email",
                },
                password :{
                    type : "string",
                    min : 3,
                }
            };

            //memasukan req.body ke dalam variable
            let email = req.body.email;
            let password = req.body.password;

            //validasi menggunakan module fastest-validator
            const validate = v.validate({
                email : email,
                password : password,
            }, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            let adminGets = await User.findOne({
                    where : {
                        email : email
                    }
            });

            //cek apakah email ada
            if(!adminGets){
                res.status(404).json(response(404,'Email tidak terdaftar'));
                return;
            }

            //check password
            if(!passwordHash.verify(password, adminGets.password)){
                res.status(403).json(response(403,'Password anda salah'));
                return;
            }

            //membuat token jwt
            let token = jwt.sign({
                adminId: adminGets.id,
            }, baseConfig.auth_secret, {
                expiresIn: 86400 // expired dalam 24 jam
            });

            //mengirim response dengan bantuan helper response.formatter
            res.status(200).json(response(200,'login success', {token : token})); 

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //logout admin
    logoutAdmin : async (req,res) => {
        try{
            let token = req.headers.authorization.split(' ')[1];

            let tokenInsert = await Token.create({
                token: token
            });

            //send response
            res.status(200).json(response(200,'logout success', {}));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    }

}