const AduanController = require('../controllers/AduanController');
const mid = require('../middleware/auth');
const express = require('express');
const route = express.Router();
const multer = require('multer');
const upload = multer();


route.post('/admin/aduan/create', [mid.isLogin, mid.isLogout], AduanController.createAduan);
route.get('/admin/aduan/get', [mid.isLogin, mid.isLogout, upload.array()], AduanController.getAduanAll); 
route.post('/admin/aduan/get/:id',[mid.isLogin, mid.isLogout],AduanController.getAduanById);
route.put('/admin/aduan/update/:id',[mid.isLogin, mid.isLogout],AduanController.updateAduan);
route.delete('/admin/aduan/delete/:id',[mid.isLogin, mid.isLogout], AduanController.deleteAduan); 

module.exports = route;