const BeritaController = require('../controllers/BeritaController');
const mid = require('../middleware/auth');
const express = require('express');
const route = express.Router();
const multer = require('multer');
const upload = multer();



route.post('/admin/berita/create', [mid.isLogin, mid.isLogout], BeritaController.createBerita);
route.get('/admin/berita/get', [mid.isLogin, mid.isLogout, upload.array()], BeritaController.getBeritaAll); 
route.post('/admin/berita/get/:id',[mid.isLogin, mid.isLogout],BeritaController.getBeritaById);
route.put('/admin/berita/update/:id',[mid.isLogin, mid.isLogout],BeritaController.updateBerita);
route.delete('/admin/berita/delete/:id',[mid.isLogin, mid.isLogout], BeritaController.deleteBerita); 

module.exports = route;